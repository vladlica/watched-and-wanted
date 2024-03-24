import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { DarkModeProvider } from "./context/DarkModeContext";
import GlobalStyles from "./styles/GlobalStyles";
import Dashboard from "./pages/Dashboard";
import Book from "./pages/Book";
import Books from "./pages/Books";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import SeriesDetailsPage from "./pages/SeriesDetailsPage";
import YoutubeChannels from "./pages/YoutubeChannels";
import Account from "./pages/Account";
import Anime from "./pages/Anime";
import PageNotFound from "./pages/PageNotFound";
import Movie from "./pages/Movie";
import AnimeDetailsPage from "./pages/AnimeDetailsPage";
import YoutubeChannel from "./pages/YoutubeChannel";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import NonAuthenticatedRoute from "./ui/NonAuthenticatedRoute";

// Setting staleTime to 0 ensures that data is always considered stale, triggering a re-fetch
// whenever a change occurs, thus keeping the data up-to-date with the latest changes
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="dashboard" />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/books" element={<Books />} />
              <Route path="/books/:bookId" element={<Book />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/movies/:movieId" element={<Movie />} />
              <Route path="/series" element={<Series />} />
              <Route path="/series/:seriesId" element={<SeriesDetailsPage />} />
              <Route path="/channels" element={<YoutubeChannels />} />
              <Route path="/channels/:channelId" element={<YoutubeChannel />} />
              <Route path="/anime" element={<Anime />} />
              <Route path="/anime/:animeId" element={<AnimeDetailsPage />} />
              <Route path="/account" element={<Account />} />
            </Route>
            <Route
              path="/login"
              element={
                <NonAuthenticatedRoute>
                  <Login />
                </NonAuthenticatedRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <NonAuthenticatedRoute>
                  <SignUp />
                </NonAuthenticatedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
              textAlign: "center",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
