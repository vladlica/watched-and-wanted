--I chose to use these stored procedures, because some of the API functions need to do multiple steps. For example, when doing an insert in the "books" table I also might need to do an insert in the "extra_info table" and if the second insert fails I need tO rollback the first insert. That can't be done (at the time of creating this app) with the Supabase JavaScript Client and the only way to rollback is to create these procedures and use the "rpc" method. I ran these procedures on the Supabase site, using the SQL editior.

--also for activating the delete on cascade option, so that when I delete a row from a parent table all the rows that are linked to it through a foreign key in a child table, will also be deleted, I needed to execute on the Supabase site, using the SQL editor something like this (https://stackoverflow.com/questions/69251891/delete-associated-records-in-supabase):

ALTER TABLE public.extra_info
DROP CONSTRAINT extra_info_"bookId"_fkey,
ADD CONSTRAINT extra_info_"bookId"_fkey
FOREIGN KEY ("bookId")
REFERENCES books(id)
ON DELETE CASCADE;

-----------------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION insert_book_and_extra_info(
    p_book_data jsonb[],
    p_extra_info_data jsonb[]
) RETURNS json AS $$
DECLARE
  book_record record; -- Declare a variable for the returned columns
  extra_info_record jsonb; -- Declare a variable for the loop
  result_json jsonb; -- Variable to store the result
BEGIN
  -- Extract values from the JSON object for books table
  INSERT INTO books (title, author, series, "numVolumes", "numPages", status, "startDate", "finishDate")
  VALUES (
    p_book_data[1]->>'title',
    p_book_data[1]->>'author',
    p_book_data[1]->>'series',
    COALESCE(NULLIF((p_book_data[1]->>'numVolumes')::text, ''), '0')::smallint,
    COALESCE(NULLIF((p_book_data[1]->>'numPages')::text, ''), '0')::smallint,
    p_book_data[1]->>'status',
    TO_TIMESTAMP(p_book_data[1]->>'startDate', 'YYYY-MM-DD"T"HH24:MI:SS.MSSTZ') AT TIME ZONE 'UTC' ,
    TO_TIMESTAMP(p_book_data[1]->>'finishDate', 'YYYY-MM-DD"T"HH24:MI:SS.MSSTZ') AT TIME ZONE 'UTC' 
  )
  RETURNING * INTO book_record;

  -- Loop through the array of extra_info_data and insert into extra_info table
  FOREACH extra_info_record IN ARRAY p_extra_info_data
  LOOP
    IF length(extra_info_record->>'text') > 5 THEN
      RAISE EXCEPTION 'Text length exceeds the allowed limit for testing rollback';
    END IF;

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
$$ LANGUAGE plpgsql;
-----------------------------------------------------------------------------------------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_book_and_extra_info(
    p_book_id integer,
    p_book_data jsonb[],
    p_extra_info_data jsonb[]
) RETURNS jsonb AS $$
DECLARE
  updated_book_record record; -- Declare a variable for the updated book information
  extra_info_record jsonb; -- Declare a variable for the loop
  result_json jsonb; -- Variable to store the result
BEGIN
  -- Update values in the books table
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
$$ LANGUAGE plpgsql;
