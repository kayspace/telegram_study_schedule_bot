'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4">📚 Telegram Study Bot</h1>
          <p className="text-xl text-slate-300">
            Automated daily study schedule reminders & planning
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Telegram Status */}
          <div className="bg-slate-700 rounded-lg p-6 border-l-4 border-blue-500">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <span>🤖</span> Bot Status
            </h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Webhook:</strong>{' '}
                <code className="bg-slate-800 px-2 py-1 rounded">
                  /api/telegram
                </code>
              </p>
              <p>
                <strong>Cron:</strong>{' '}
                <code className="bg-slate-800 px-2 py-1 rounded">
                  /api/cron/schedule
                </code>
              </p>
              <p className="text-slate-400 pt-2">
                ✅ API endpoints ready
              </p>
            </div>
          </div>

          {/* Setup Progress */}
          <div className="bg-slate-700 rounded-lg p-6 border-l-4 border-green-500">
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-2">
              <span>✅</span> Setup Checklist
            </h2>
            <ul className="space-y-2 text-sm">
              <li>☐ Get bot token from BotFather</li>
              <li>☐ Add TELEGRAM_BOT_TOKEN to env</li>
              <li>☐ Set webhook URL in Telegram</li>
              <li>☐ Configure cron job (7 AM)</li>
            </ul>
          </div>
        </div>

        {/* Features */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span>🚀</span> Manual Start
              </h3>
              <p className="text-slate-300">
                Send <code className="bg-slate-800 px-2 py-1 rounded">/start</code> anytime
                to begin planning (perfect for testing)
              </p>
            </div>

            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span>⏰</span> Daily 7 AM Reminder
              </h3>
              <p className="text-slate-300">
                Automatic prompts every morning to select your
                study subjects
              </p>
            </div>

            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span>📋</span> 4 Time Slots
              </h3>
              <p className="text-slate-300">
                8:30 AM, 12:10 PM, 2:40 PM, 7:30 PM - select
                subjects for each
              </p>
            </div>

            <div className="bg-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span>🎯</span> 7 Subjects
              </h3>
              <p className="text-slate-300">
                Choose from: Aerodynamics, Space Dynamics,
                Propulsion, Structures, Flight Mechanics, Math, Aptitude
              </p>
            </div>
          </div>
        </section>

        {/* Quick Start */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Quick Start (5 minutes)</h2>
          <div className="bg-slate-700 rounded-lg p-8 space-y-4">
            <div className="flex gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold">Get Bot Token</h3>
                <p className="text-slate-300">
                  Search "BotFather" on Telegram, type
                  <code className="bg-slate-800 px-2 py-1 rounded ml-2">
                    /newbot
                  </code>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold">Set Environment Variable</h3>
                <p className="text-slate-300">
                  Add to{' '}
                  <code className="bg-slate-800 px-2 py-1 rounded">
                    .env.local
                  </code>
                  :
                </p>
                <code className="block bg-slate-800 px-3 py-2 rounded mt-2 text-sm overflow-x-auto">
                  TELEGRAM_BOT_TOKEN=your_token_here
                </code>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold">Run Locally</h3>
                <p className="text-slate-300">
                  Execute
                  <code className="bg-slate-800 px-2 py-1 rounded mx-2">
                    npm run dev
                  </code>
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold">Test Your Bot</h3>
                <p className="text-slate-300">
                  Search your bot on Telegram and click Start!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Guides */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Setup Guides</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <a
              href="/QUICK_START.md"
              download
              className="bg-blue-600 hover:bg-blue-700 rounded-lg p-6 text-center transition"
            >
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-bold">Quick Start</h3>
              <p className="text-sm text-blue-100 mt-2">
                5-minute setup guide
              </p>
            </a>

            <a
              href="/TELEGRAM_BOT_SETUP.md"
              download
              className="bg-green-600 hover:bg-green-700 rounded-lg p-6 text-center transition"
            >
              <div className="text-3xl mb-2">📚</div>
              <h3 className="font-bold">Full Guide</h3>
              <p className="text-sm text-green-100 mt-2">
                Complete setup & deployment
              </p>
            </a>

            <a
              href="/CRON_SETUP.md"
              download
              className="bg-purple-600 hover:bg-purple-700 rounded-lg p-6 text-center transition"
            >
              <div className="text-3xl mb-2">🕐</div>
              <h3 className="font-bold">Cron Setup</h3>
              <p className="text-sm text-purple-100 mt-2">
                Daily 7 AM reminders config
              </p>
            </a>
          </div>
        </section>

        {/* Environment Setup */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Environment Setup</h2>
          <div className="bg-slate-700 rounded-lg p-8">
            <p className="text-slate-300 mb-4">
              Create a <code className="bg-slate-800 px-2 py-1 rounded">.env.local</code> file:
            </p>
            <div className="bg-slate-800 rounded p-4 overflow-x-auto">
              <pre className="text-sm">
{`TELEGRAM_BOT_TOKEN=your_bot_token_from_botfather
CRON_SECRET=your-secret-key-change-this
`}
              </pre>
            </div>
            <p className="text-slate-400 text-sm mt-4">
              See <code className="bg-slate-800 px-2 py-1 rounded">.env.example</code> for reference
            </p>
          </div>
        </section>

        {/* File Structure */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Project Structure</h2>
          <div className="bg-slate-700 rounded-lg p-6 font-mono text-sm overflow-x-auto">
            <pre>{`lib/
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
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Start? 🚀</h2>
          <p className="mb-6 text-slate-100">
            Follow the Quick Start guide to get your bot running in 5 minutes
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://t.me/BotFather"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-purple-600 px-6 py-2 rounded font-bold hover:bg-slate-100 transition"
            >
              Message BotFather →
            </a>
            <button
              onClick={() => {
                const el = document.createElement('a');
                el.href = '/QUICK_START.md';
                el.download = 'QUICK_START.md';
                el.click();
              }}
              className="bg-slate-800 text-white px-6 py-2 rounded font-bold hover:bg-slate-700 transition"
            >
              Download Guide
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-slate-400 text-sm">
          <p>Telegram Study Schedule Bot • Made with Next.js</p>
          <p className="mt-2">
            For detailed instructions, check TELEGRAM_BOT_SETUP.md
          </p>
        </footer>
      </div>
    </main>
  );
}
