import Table from "../../ui/Table";
import SeriesRow from "./SeriesRow";

const series = [
  {
    id: 1,
    title: "Mayans MC",
    seasons: 5,
    status: "watched",
    hasBook: false,
    hasMovie: false,
    hasNews: false,
    isFinished: true,
    numEpisodes: 50,
  },
  {
    id: 2,
    title: "Sunderland til I die",
    seasons: 2,
    status: "watched",
    hasBook: false,
    hasMovie: false,
    hasNews: true,
    isFinished: true,
    numEpisodes: 23,
  },
  {
    id: 3,
    title: "The Last Kingdom",
    seasons: null,
    status: "wanted",
    hasBook: true,
    hasMovie: true,
    hasNews: null,
    isFinished: true,
    numEpisodes: 100,
  },
  {
    id: 4,
    title: "The Witcher",
    seasons: null,
    status: "wanted",
    hasBook: true,
    hasMovie: false,
    hasNews: null,
    isFinished: false,
    numEpisodes: 100,
  },
];

function SeriesTable() {
  return (
    <Table columns="2fr 1fr 0.6fr 0.6fr 0.6fr 0.6fr 0.6fr 2fr ">
      <Table.Header>
        <div>Title</div>
        <div>Status</div>
        <div>Seasons</div>
        <div>Book</div>
        <div>Movie</div>
        <div>News</div>
        <div>Finished</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={series}
        render={(seriesItem) => (
          <SeriesRow series={seriesItem} key={seriesItem.id} />
        )}
      />
    </Table>
  );
}

export default SeriesTable;
