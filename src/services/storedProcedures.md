# Stored Procedures Documentation

## Purpose

These stored procedures perform various operations on the database tables. They are used to handle complex operations that cannot be done directly through the Supabase JavaScript Client. They also handle specific requirements such as cascading deletes and transactional integrity.

## Activating DELETE ON CASCADE Option

To activate the delete on cascade option, allowing rows linked to a parent table to be deleted when the parent row is deleted, execute the following SQL statement:

```sql
ALTER TABLE public.extra_info
DROP CONSTRAINT extra_info_"bookId"_fkey,
ADD CONSTRAINT extra_info_"bookId"_fkey
FOREIGN KEY ("bookId")
REFERENCES books(id)
ON DELETE CASCADE;
```

## Verify User Password

This stored procedure checks if the password typed by the user is the correct one.

```sql
-- Set the search path to include necessary schemas
SET search_path = extensions, public, auth;

CREATE OR REPLACE FUNCTION public.verify_user_password(password text)
RETURNS BOOLEAN SECURITY DEFINER AS
$$
DECLARE
  user_id uuid;
BEGIN
  -- Get the user ID of the current user
  user_id := auth.uid();

  -- Check if the provided password matches the encrypted password for the user
  RETURN EXISTS (
    SELECT id
    FROM auth.users
    WHERE id = user_id AND encrypted_password = crypt(password, encrypted_password)
  );
END;
$$ LANGUAGE plpgsql;
```

## Delete User Account

This stored procedure deletes the account of the current user.

```sql
CREATE OR REPLACE FUNCTION delete_user(user_id UUID)
RETURNS VOID
LANGUAGE SQL SECURITY DEFINER
AS $$
   DELETE FROM auth.users WHERE id = user_id;
$$;
```

## Insert Book and Extra Info

This stored procedure inserts a new book into the database along with additional extra information.

```sql
CREATE OR REPLACE FUNCTION insert_book_and_extra_info(
    p_book_data jsonb[],
    p_extra_info_data jsonb[]
) RETURNS json AS
$$

DECLARE
    book_record record; -- Declare a variable for the returned columns
    extra_info_record jsonb; -- Declare a variable for the loop
    result_json jsonb; -- Variable to store the result
BEGIN
    INSERT INTO books (title, author, series, "numVolumes", "numPages", status, "startDate", "finishDate")
    VALUES (
        p_book_data[1]->>'title',
        p_book_data[1]->>'author',
        p_book_data[1]->>'series',
        COALESCE(NULLIF((p_book_data[1]->>'numVolumes')::text, ''), '0')::smallint,
        COALESCE(NULLIF((p_book_data[1]->>'numPages')::text, ''), '0')::smallint,
        p_book_data[1]->>'status',
        TO_TIMESTAMP(p_book_data[1]->>'startDate', 'YYYY-MM-DD"T"HH24:MI:SS.MSSTZ') AT TIME ZONE 'UTC',
        TO_TIMESTAMP(p_book_data[1]->>'finishDate', 'YYYY-MM-DD"T"HH24:MI:SS.MSSTZ') AT TIME ZONE 'UTC'
    )
    RETURNING * INTO book_record;

    -- Loop through the array of extra_info_data and insert into the extra_info table
    FOREACH extra_info_record IN ARRAY p_extra_info_data
    LOOP
        -- Use the captured book_id in the extra_info insert
        INSERT INTO extra_info ("bookId", text, link)
        VALUES (book_record.id, extra_info_record->>'text', extra_info_record->>'link');
    END LOOP;

    -- Convert the book_record to JSON
    SELECT jsonb_build_object(
        'id', book_record.id,
        'title', book_record.title,
        'author', book_record.author,
        'series', book_record.series,
        'numVolumes', book_record."numVolumes",
        'numPages', book_record."numPages",
        'status', book_record.status,
        'startDate', book_record."startDate",
        'finishDate', book_record."finishDate"
    ) INTO result_json;

    -- Return a JSON object if needed, otherwise, use RETURN;
    RETURN result_json;

EXCEPTION
    -- If an exception occurs, re-raise the exception
    WHEN OTHERS THEN
        -- Re-raise the exception
        RAISE;
END;

$$
LANGUAGE plpgsql;
```

## Update Book and Extra Info

This stored procedure updates an existing book and its associated extra information in the database.

```sql
CREATE OR REPLACE FUNCTION update_book_and_extra_info(
    p_book_id integer,
    p_book_data jsonb[],
    p_extra_info_data jsonb[]
) RETURNS jsonb AS
$$

DECLARE
    updated_book_record record; -- Declare a variable for the updated book information
    extra_info_record jsonb; -- Declare a variable for the loop
    result_json jsonb; -- Variable to store the result
BEGIN
    UPDATE books
    SET
        title = p_book_data[1]->>'title',
        author = p_book_data[1]->>'author',
        series = p_book_data[1]->>'series',
        "numVolumes" = COALESCE(NULLIF((p_book_data[1]->>'numVolumes')::text, ''), '0')::smallint,
        "numPages" = COALESCE(NULLIF((p_book_data[1]->>'numPages')::text, ''), '0')::smallint,
        status = p_book_data[1]->>'status',
        "startDate" = TO_TIMESTAMP(p_book_data[1]->>'startDate', 'YYYY-MM-DD"T"HH24:MI:SS.MSSTZ') AT TIME ZONE 'UTC',
        "finishDate" = TO_TIMESTAMP(p_book_data[1]->>'finishDate', 'YYYY-MM-DD"T"HH24:MI:SS.MSSTZ') AT TIME ZONE 'UTC'
    WHERE id = p_book_id
    RETURNING * INTO updated_book_record;

    -- Delete existing records in the extra_info table for the given book ID
    DELETE FROM extra_info
    WHERE "bookId" = p_book_id;

    -- Loop through the array of extra_info_data and insert into extra_info table
    FOREACH extra_info_record IN ARRAY p_extra_info_data
    LOOP
        -- Insert new records into the extra_info table
        INSERT INTO extra_info ("bookId", text, link)
        VALUES (p_book_id, extra_info_record->>'text', extra_info_record->>'link');
    END LOOP;

    -- Convert the updated_book_record to JSON
    SELECT jsonb_build_object(
        'id', updated_book_record.id,
        'title', updated_book_record.title,
        'author', updated_book_record.author,
        'series', updated_book_record.series,
        'numVolumes', updated_book_record."numVolumes",
        'numPages', updated_book_record."numPages",
        'status', updated_book_record.status,
        'startDate', updated_book_record."startDate",
        'finishDate', updated_book_record."finishDate"
    ) INTO result_json;

    -- Return the result as JSON
    RETURN result_json;

EXCEPTION
    -- If an exception occurs, re-raise the exception
    WHEN OTHERS THEN
        -- Re-raise the exception
        RAISE;
END;
$$
LANGUAGE plpgsql;
```

## Insert Series and Extra Info

This stored procedure inserts a new series and its associated extra information into the database.

```sql
CREATE OR REPLACE FUNCTION insert_series_and_extra_info(
    p_series_data jsonb[],
    p_extra_info_data jsonb[]
) RETURNS json AS
$$

DECLARE
    series_record record; -- Declare a variable for the returned columns
    extra_info_record jsonb; -- Declare a variable for the loop
    result_json jsonb; -- Variable to store the result
BEGIN
    INSERT INTO series (title, "numSeasons", "numEpisodes", status, "hasBook", "hasMovie", "hasNews", "isFinished")
    VALUES (
        p_series_data[1]->>'title',
        COALESCE(NULLIF((p_series_data[1]->>'numSeasons')::text, ''), '0')::smallint,
        COALESCE(NULLIF((p_series_data[1]->>'numEpisodes')::text, ''), '0')::smallint,
        p_series_data[1]->>'status',
        (p_series_data[1]->>'hasBook')::boolean,
        (p_series_data[1]->>'hasMovie')::boolean,
        (p_series_data[1]->>'hasNews')::boolean,
        (p_series_data[1]->>'isFinished')::boolean
    )
    RETURNING * INTO series_record;

    -- Loop through the array of extra_info_data and insert into extra_info table
    FOREACH extra_info_record IN ARRAY p_extra_info_data
    LOOP
        -- Use the captured series_id in the extra_info insert
        INSERT INTO extra_info ("seriesId", text, link)
        VALUES (series_record.id, extra_info_record->>'text', extra_info_record->>'link');
    END LOOP;

    -- Convert the series_record to JSON
    SELECT jsonb_build_object(
        'id', series_record.id,
        'title', series_record.title,
        'numSeasons', series_record."numSeasons",
        'numEpisodes', series_record."numEpisodes",
        'status', series_record.status,
        'hasBook', series_record."hasBook",
        'hasMovie', series_record."hasMovie",
        'hasNews', series_record."hasNews",
        'isFinished', series_record."hasMovie"
    ) INTO result_json;

    -- Return a JSON object if needed, otherwise, use RETURN;
    RETURN result_json;

EXCEPTION
    -- If an exception occurs, re-raise the exception
    WHEN OTHERS THEN
        -- Re-raise the exception
        RAISE;
END;

$$
LANGUAGE plpgsql;
```

## Update Series and Extra Info

This stored procedure updates an existing series and its associated extra information in the database.

```sql
CREATE OR REPLACE FUNCTION update_series_and_extra_info(
    p_series_id integer,
    p_series_data jsonb[],
    p_extra_info_data jsonb[]
) RETURNS jsonb AS
$$

DECLARE
    updated_series_record record; -- Declare a variable for the updated series information
    extra_info_record jsonb; -- Declare a variable for the loop
    result_json jsonb; -- Variable to store the result
BEGIN
    UPDATE series
    SET
        title = p_series_data[1]->>'title',
        "numSeasons" = COALESCE(NULLIF((p_series_data[1]->>'numSeasons')::text, ''), '0')::smallint,
        "numEpisodes" = COALESCE(NULLIF((p_series_data[1]->>'numEpisodes')::text, ''), '0')::smallint,
        status = p_series_data[1]->>'status',
        "hasBook" = (p_series_data[1]->>'hasBook')::boolean,
        "hasMovie" = (p_series_data[1]->>'hasMovie')::boolean,
        "hasNews" = (p_series_data[1]->>'hasNews')::boolean,
        "isFinished" = (p_series_data[1]->>'isFinished')::boolean
    WHERE id = p_series_id
    RETURNING * INTO updated_series_record;

    -- Delete existing records in the extra_info table for the given series ID
    DELETE FROM extra_info
    WHERE "seriesId" = p_series_id;

    -- Loop through the array of extra_info_data and insert into extra_info table
    FOREACH extra_info_record IN ARRAY p_extra_info_data
    LOOP
        -- Insert new records into the extra_info table
        INSERT INTO extra_info ("seriesId", text, link)
        VALUES (p_series_id, extra_info_record->>'text', extra_info_record->>'link');
    END LOOP;

    -- Convert the updated_series_record to JSON
    SELECT jsonb_build_object(
        'id', updated_series_record.id,
        'title', updated_series_record.title,
        'numSeasons', updated_series_record."numSeasons",
        'numEpisodes', updated_series_record."numEpisodes",
        'status', updated_series_record.status,
        'hasBook', updated_series_record."hasBook",
        'hasMovie', updated_series_record."hasMovie",
        'hasNews', updated_series_record."hasNews",
        'isFinished', updated_series_record."isFinished"
    ) INTO result_json;

    -- Return the result as JSON
    RETURN result_json;

EXCEPTION
    -- If an exception occurs, re-raise the exception
    WHEN OTHERS THEN
        -- Re-raise the exception
        RAISE;
END;

$$
LANGUAGE plpgsql;
```

## Insert Movie and Extra Info

This stored procedure inserts a new movie and its associated extra information into the database.

```sql
CREATE OR REPLACE FUNCTION insert_movie_and_extra_info(
    p_movie_data jsonb[],
    p_extra_info_data jsonb[]
) RETURNS json AS
$$

DECLARE
    movie_record record; -- Declare a variable for the returned columns
    extra_info_record jsonb; -- Declare a variable for the loop
    result_json jsonb; -- Variable to store the result
BEGIN
    INSERT INTO movies (title, status, duration, "hasBook")
    VALUES (
        p_movie_data[1]->>'title',
        p_movie_data[1]->>'status',
        COALESCE(NULLIF((p_movie_data[1]->>'duration')::text, ''), '0')::smallint,
        (p_movie_data[1]->>'hasBook')::boolean
    )
    RETURNING * INTO movie_record;

    -- Loop through the array of extra_info_data and insert into extra_info table
    FOREACH extra_info_record IN ARRAY p_extra_info_data
    LOOP
        -- Use the captured movie_id in the extra_info insert
        INSERT INTO extra_info ("movieId", text, link)
        VALUES (movie_record.id, extra_info_record->>'text', extra_info_record->>'link');
    END LOOP;

    -- Convert the movie_record to JSON
    SELECT jsonb_build_object(
        'id', movie_record.id,
        'title', movie_record.title,
        'status', movie_record.status,
        'duration', movie_record.duration,
        'hasBook', movie_record."hasBook"
    ) INTO result_json;

    -- Return a JSON object if needed, otherwise, use RETURN;
    RETURN result_json;

EXCEPTION
    -- If an exception occurs, re-raise the exception
    WHEN OTHERS THEN
        -- Re-raise the exception
        RAISE;
END;
$$
LANGUAGE plpgsql;
```

## Update Movie and Extra Info

This stored procedure updates an existing movie and its associated extra information in the database.

```sql
CREATE OR REPLACE FUNCTION update_movie_and_extra_info(
    p_movie_id integer,
    p_movie_data jsonb[],
    p_extra_info_data jsonb[]
) RETURNS jsonb AS
$$

DECLARE
    updated_movie_record record; -- Declare a variable for the updated movie information
    extra_info_record jsonb; -- Declare a variable for the loop
    result_json jsonb; -- Variable to store the result
BEGIN
    UPDATE movies
    SET
        title = p_movie_data[1]->>'title',
        duration = COALESCE(NULLIF((p_movie_data[1]->>'duration')::text, ''), '0')::smallint,
        status = p_movie_data[1]->>'status',
        "hasBook" = (p_movie_data[1]->>'hasBook')::boolean
    WHERE id = p_movie_id
    RETURNING * INTO updated_movie_record;

    -- Delete existing records in the extra_info table for the given movie ID
    DELETE FROM extra_info WHERE "movieId" = p_movie_id;

    -- Loop through the array of extra_info_data and insert into extra_info table
    FOREACH extra_info_record IN ARRAY p_extra_info_data
    LOOP
        -- Insert new records into the extra_info table
        INSERT INTO extra_info ("movieId", text, link)
        VALUES (p_movie_id, extra_info_record->>'text', extra_info_record->>'link');
    END LOOP;

    -- Convert the updated_movie_record to JSON
    SELECT jsonb_build_object(
        'id', updated_movie_record.id,
        'title', updated_movie_record.title,
        'duration', updated_movie_record.duration,
        'status', updated_movie_record.status,
        'hasBook', updated_movie_record."hasBook"
    ) INTO result_json;

    -- Return the result as JSON
    RETURN result_json;

EXCEPTION
    -- If an exception occurs, re-raise the exception
    WHEN OTHERS THEN
        -- Re-raise the exception
        RAISE;
END;
$$
LANGUAGE plpgsql;
```

## Insert Anime and Extra Info

This stored procedure inserts a new anime and its associated extra information into the database.

```sql
CREATE OR REPLACE FUNCTION insert_anime_and_extra_info(
    p_anime_data jsonb[],
    p_extra_info_data jsonb[]
) RETURNS json AS
$$

DECLARE
    anime_record record; -- Declare a variable for the returned columns
    extra_info_record jsonb; -- Declare a variable for the loop
    result_json jsonb; -- Variable to store the result
BEGIN
    INSERT INTO anime (title, status, "numEpisodes")
    VALUES (
        p_anime_data[1]->>'title',
        p_anime_data[1]->>'status',
        COALESCE(NULLIF((p_anime_data[1]->>'numEpisodes')::text, ''), '0')::smallint
    )
    RETURNING * INTO anime_record;

    -- Loop through the array of extra_info_data and insert into extra_info table
    FOREACH extra_info_record IN ARRAY p_extra_info_data
    LOOP
        -- Use the captured anime_id in the extra_info insert
        INSERT INTO extra_info ("animeId", text, link)
        VALUES (anime_record.id, extra_info_record->>'text', extra_info_record->>'link');
    END LOOP;

    -- Convert the anime_record to JSON
    SELECT jsonb_build_object(
        'id', anime_record.id,
        'title', anime_record.title,
        'status', anime_record.status,
        'numEpisodes', anime_record."numEpisodes"
    ) INTO result_json;

    -- Return a JSON object if needed, otherwise, use RETURN;
    RETURN result_json;

EXCEPTION
    -- If an exception occurs, re-raise the exception
    WHEN OTHERS THEN
        -- Re-raise the exception
        RAISE;
END;
$$
LANGUAGE plpgsql;
```

## Update Anime and Extra Info

This stored procedure updates an existing anime and its associated extra information in the database.

```sql
CREATE OR REPLACE FUNCTION update_anime_and_extra_info(
    p_anime_id integer,
    p_anime_data jsonb[],
    p_extra_info_data jsonb[]
) RETURNS jsonb AS
$$

DECLARE
    updated_anime_record record; -- Declare a variable for the updated anime information
    extra_info_record jsonb; -- Declare a variable for the loop
    result_json jsonb; -- Variable to store the result
BEGIN
    UPDATE anime
    SET
        title = p_anime_data[1]->>'title',
        "numEpisodes" = COALESCE(NULLIF((p_anime_data[1]->>'numEpisodes')::text, ''), '0')::smallint,
        status = p_anime_data[1]->>'status'
    WHERE id = p_anime_id
    RETURNING * INTO updated_anime_record;

    -- Delete existing records in the extra_info table for the given anime ID
    DELETE FROM extra_info
    WHERE "animeId" = p_anime_id;

    -- Loop through the array of extra_info_data and insert into extra_info table
    FOREACH extra_info_record IN ARRAY p_extra_info_data
    LOOP
        -- Insert new records into the extra_info table
        INSERT INTO extra_info ("animeId", text, link)
        VALUES (p_anime_id, extra_info_record->>'text', extra_info_record->>'link');
    END LOOP;

    -- Convert the updated_anime_record to JSON
    SELECT jsonb_build_object(
        'id', updated_anime_record.id,
        'title', updated_anime_record.title,
        'numEpisodes', updated_anime_record."numEpisodes",
        'status', updated_anime_record.status
    ) INTO result_json;

    -- Return the result as JSON
    RETURN result_json;

EXCEPTION
    -- If an exception occurs, re-raise the exception
    WHEN OTHERS THEN
        -- Re-raise the exception
        RAISE;
END;
$$
LANGUAGE plpgsql;
```

## Insert Channel and Extra Info

This stored procedure inserts a new YouTube channel and its associated extra information into the database.

```sql
CREATE OR REPLACE FUNCTION insert_channel_and_extra_info(
    p_channel_data jsonb[],
    p_extra_info_data jsonb[]
) RETURNS json AS
$$

DECLARE
    channel_record record; -- Declare a variable for the returned columns
    extra_info_record jsonb; -- Declare a variable for the loop
    result_json jsonb; -- Variable to store the result
BEGIN
    INSERT INTO youtube_channels ("channelName", status, "hasBell")
    VALUES (
        p_channel_data[1]->>'channelName',
        p_channel_data[1]->>'status',
        (p_channel_data[1]->>'hasBell')::boolean
    )
    RETURNING * INTO channel_record;

    -- Loop through the array of extra_info_data and insert into extra_info table
    FOREACH extra_info_record IN ARRAY p_extra_info_data
    LOOP
        -- Use the captured channel_id in the extra_info insert
        INSERT INTO extra_info ("youtubeChannelId", text, link)
        VALUES (channel_record.id, extra_info_record->>'text', extra_info_record->>'link');
    END LOOP;

    -- Convert the channel_record to JSON
    SELECT jsonb_build_object(
        'id', channel_record.id,
        'channelName', channel_record."channelName",
        'status', channel_record.status,
        'hasBell', channel_record."hasBell"
    ) INTO result_json;

    -- Return a JSON object
    RETURN result_json;

EXCEPTION
    -- If an exception occurs, re-raise the exception
    WHEN OTHERS THEN
        -- Re-raise the exception
        RAISE;
END;
$$
LANGUAGE plpgsql;
```

## Update Channel and Extra Info

This stored procedure updates an existing YouTube channel and its associated extra information in the database.

```sql
CREATE OR REPLACE FUNCTION update_channel_and_extra_info(
    p_channel_id integer,
    p_channel_data jsonb[],
    p_extra_info_data jsonb[]
) RETURNS jsonb AS
$$

DECLARE
    updated_channel_record record; -- Declare a variable for the updated channel information
    extra_info_record jsonb; -- Declare a variable for the loop
    result_json jsonb; -- Variable to store the result
BEGIN
    UPDATE youtube_channels
    SET
        "channelName" = p_channel_data[1]->>'channelName',
        status = p_channel_data[1]->>'status',
        "hasBell" = (p_channel_data[1]->>'hasBell')::boolean
    WHERE id = p_channel_id
    RETURNING * INTO updated_channel_record;

    -- Delete existing records in the extra_info table for the given channel ID
    DELETE FROM extra_info
    WHERE "youtubeChannelId" = p_channel_id;

    -- Loop through the array of extra_info_data and insert into extra_info table
    FOREACH extra_info_record IN ARRAY p_extra_info_data
    LOOP
        -- Insert new records into the extra_info table
        INSERT INTO extra_info ("youtubeChannelId", text, link)
        VALUES (p_channel_id, extra_info_record->>'text', extra_info_record->>'link');
    END LOOP;

    -- Convert the updated_channel_record to JSON
    SELECT jsonb_build_object(
        'id', updated_channel_record.id,
        'channelName', updated_channel_record."channelName",
        'status', updated_channel_record.status,
        'hasBell', updated_channel_record."hasBell"
    ) INTO result_json;

    -- Return the result as JSON
    RETURN result_json;

EXCEPTION
    -- If an exception occurs, re-raise the exception
    WHEN OTHERS THEN
        -- Re-raise the exception
        RAISE;
END;
$$
LANGUAGE plpgsql;
```
