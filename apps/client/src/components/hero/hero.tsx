import { Link } from 'react-router-dom';
import { handleComingSoonAlert } from '../../utils/coming-soon-alert';

export function Hero() {
  return (
    <section className="bg-white dark:bg-gray-900 py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to CodeJudge</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              CodeJudge is a platform for holding programming contests. Participate in
              challenges, solve problems, and climb the leaderboard.
            </p>
            <div className="flex gap-4 pt-16">
              <Link
                to="#"
                className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300"
                onClick={(e) => {
                  e.preventDefault();
                  handleComingSoonAlert();
                }}
              >
                View Contests
              </Link>
              <Link
                to="/problems"
                className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:ring-gray-300"
                // prefetch={false}
              >
                Solve Problems
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <img
              src="https://ideogram.ai/assets/progressive-image/balanced/response/KYrxe_fyQfOgBUwEjTfAYQ"
              width="700"
              height="450"
              alt="CodeJudge"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}