"use client";

import Link from "next/link";
import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6 font-mono">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            📚 Telegram Study Bot
          </h1>
          <p className="text-base text-gray-600">
            Automated daily study schedule reminders & planning
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Telegram Status */}
          <div className="bg-white rounded-lg p-6 border-l-4 border-blue-200 shadow-sm">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-800">
              <span>🤖</span> Bot Status
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Webhook:</strong>{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  /api/telegram
                </code>
              </p>
              <p>
                <strong>Cron:</strong>{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  /api/cron/schedule
                </code>
              </p>
              <p className="text-gray-500 pt-2">✅ API endpoints ready</p>
            </div>
          </div>

          {/* Setup Progress */}
          <div className="bg-white rounded-lg p-6 border-l-4 border-green-200 shadow-sm">
            <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-800">
              <span>✅</span> Setup Checklist
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>☐ Get bot token from BotFather</li>
              <li>☐ Add TELEGRAM_BOT_TOKEN to env</li>
              <li>☐ Set webhook URL in Telegram</li>
              <li>☐ Configure cron job (7 AM)</li>
            </ul>
          </div>
        </div>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-gray-800">
                <span>🚀</span> Manual Start
              </h3>
              <p className="text-gray-600">
                Send{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  /start
                </code>{" "}
                anytime to begin planning (perfect for testing)
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-gray-800">
                <span>⏰</span> Daily 7 AM Reminder
              </h3>
              <p className="text-gray-600">
                Automatic prompts every morning to select your study subjects
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-gray-800">
                <span>📋</span> Custom Time Slots
              </h3>
              <p className="text-gray-600">
                Set your own study time slots (1-10 slots supported) with custom
                times
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2 text-gray-800">
                <span>🎯</span> 7 Subjects
              </h3>
              <p className="text-gray-600">
                Choose from: Aerodynamics, Space Dynamics, Propulsion,
                Structures, Flight Mechanics, Math, Aptitude
              </p>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            Quick Start (5 minutes)
          </h2>
          <div className="bg-white rounded-lg p-8 space-y-4 shadow-sm">
            <div className="flex gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-700 rounded-full font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Get Bot Token</h3>
                <p className="text-gray-600">
                  Search "BotFather" on Telegram, type
                  <code
                    className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700 ml-2`}
                  >
                    /newbot
                  </code>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-700 rounded-full font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-gray-800">
                  Set Environment Variable
                </h3>
                <p className="text-gray-600">
                  Add to{" "}
                  <code
                    className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                  >
                    .env.local
                  </code>
                  :
                </p>
                <code
                  className={`${geistMono.className} block bg-gray-100 px-3 py-2 rounded mt-2 text-sm text-gray-700 overflow-x-auto`}
                >
                  TELEGRAM_BOT_TOKEN=your_token_here
                </code>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-700 rounded-full font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Run Locally</h3>
                <p className="text-gray-600">
                  Execute
                  <code
                    className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700 mx-2`}
                  >
                    npm run dev
                  </code>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-700 rounded-full font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Test Your Bot</h3>
                <p className="text-gray-600">
                  Search your bot on Telegram and click Start!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GitHub & Usage */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Get Started</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-gray-800">
                <span>🚀</span> Start Using the Bot
              </h3>
              <p className="text-gray-600 mb-4">
                Ready to use the bot right away? Here's how:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>
                  Find the bot on Telegram: <strong>@your_bot_username</strong>
                </li>
                <li>
                  Send{" "}
                  <code
                    className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                  >
                    /start
                  </code>{" "}
                  to begin
                </li>
                <li>Choose your study subjects for each time slot</li>
                <li>Get your personalized schedule instantly!</li>
              </ol>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Pro tip:</strong> The bot remembers your previous
                  choices and offers to reuse them for faster setup.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2 text-gray-800">
                <span>📦</span> GitHub Repository
              </h3>
              <p className="text-gray-600 mb-4">
                View the source code, contribute, or deploy your own instance:
              </p>
              <div className="space-y-3">
                <div>
                  <strong className="text-gray-800">Author:</strong>{" "}
                  <a
                    href="https://github.com/kayspace"
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @kayspace
                  </a>
                </div>
                <div>
                  <strong className="text-gray-800">Repository:</strong>{" "}
                  <a
                    href="https://github.com/kayspace/telegram_study_schedule_bot"
                    className="text-blue-600 hover:underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/kayspace/telegram_study_schedule_bot
                  </a>
                </div>
                <div className="flex gap-2 mt-3">
                  <a
                    href="https://github.com/kayspace/telegram_study_schedule_bot"
                    className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>⭐</span> View on GitHub
                  </a>
                  <a
                    href="https://github.com/kayspace/telegram_study_schedule_bot/fork"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>🍴</span> Fork
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Guides */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Setup Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/quick-start"
              className="bg-blue-50 hover:bg-blue-100 rounded-lg p-6 text-center transition border border-blue-200 block"
            >
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-bold text-gray-800">Quick Start</h3>
              <p className="text-sm text-gray-600 mt-2">5-minute setup guide</p>
            </Link>

            <Link
              href="/full-guide"
              className="bg-green-50 hover:bg-green-100 rounded-lg p-6 text-center transition border border-green-200 block"
            >
              <div className="text-3xl mb-2">📚</div>
              <h3 className="font-bold text-gray-800">Full Guide</h3>
              <p className="text-sm text-gray-600 mt-2">
                Complete setup & deployment
              </p>
            </Link>

            <Link
              href="/cron-setup"
              className="bg-purple-50 hover:bg-purple-100 rounded-lg p-6 text-center transition border border-purple-200 block"
            >
              <div className="text-3xl mb-2">🕐</div>
              <h3 className="font-bold text-gray-800">Cron Setup</h3>
              <p className="text-sm text-gray-600 mt-2">
                Daily 7 AM reminders config
              </p>
            </Link>
          </div>
        </section>

        {/* Environment Setup */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            Environment Setup
          </h2>
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <p className="text-gray-600 mb-4">
              Create a{" "}
              <code
                className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
              >
                .env.local
              </code>{" "}
              file:
            </p>
            <div className="bg-gray-100 rounded p-4 overflow-x-auto">
              <pre className={`${geistMono.className} text-sm text-gray-700`}>
                {`TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
CRON_SECRET=your-secret-key-change-this
`}
              </pre>
            </div>
            <p className="text-gray-500 text-sm mt-4">
              See{" "}
              <code
                className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
              >
                .env.example
              </code>{" "}
              for reference
            </p>
          </div>
        </section>

        {/* File Structure */}
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6 text-gray-800">
            Project Structure
          </h2>
          <div className="bg-white rounded-lg p-6 font-mono text-sm overflow-x-auto shadow-sm">
            <pre className={`${geistMono.className} text-gray-700`}>{`lib/
├── telegram-bot.ts    # Telegram API wrapper
├── schedule.ts        # Schedule logic & storage
└── handlers.ts        # Message & button handlers

app/
└── api/
    ├── telegram/route.ts    # Webhook (receives messages)
    └── cron/schedule.ts     # Daily 7 AM trigger
`}</pre>
          </div>
        </section>

        {/* Next Steps */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center border border-blue-200">
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Ready to Start? 🚀
          </h2>
          <p className="mb-6 text-gray-600">
            Follow the Quick Start guide to get your bot running in 5 minutes
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://t.me/BotFather"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-6 py-2 rounded font-bold hover:bg-gray-700 transition"
            >
              Message BotFather →
            </a>
            <button
              onClick={() => {
                const el = document.createElement("a");
                el.href = "/QUICK_START.md";
                el.download = "QUICK_START.md";
                el.click();
              }}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded font-bold hover:bg-gray-300 transition"
            >
              Download Guide
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Telegram Study Schedule Bot • Made with Next.js</p>
          <p className="mt-2">
            For detailed instructions, check TELEGRAM_BOT_SETUP.md
          </p>
        </footer>
      </div>
    </main>
  );
}
