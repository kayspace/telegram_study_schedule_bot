"use client";

import Link from "next/link";
import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({ subsets: ["latin"] });

export default function QuickStart() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            ⚡ Quick Start - 5 Minutes to Running Bot
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <span>1️⃣</span> Create Telegram Bot (2 min)
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Open Telegram → Search <strong>"BotFather"</strong>
              </li>
              <li>
                Type{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  /newbot
                </code>
              </li>
              <li>Give it a name and username</li>
              <li>
                <strong>Copy the API Token</strong> (save this!)
              </li>
            </ol>
            <p className="text-sm text-gray-600 mt-3">
              Example token:{" "}
              <code
                className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
              >
                123456789:ABCDefGhijKlmnoPqrsTuvWxyz-1A2B3C4D
              </code>
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <span>2️⃣</span> Local Testing (2 min)
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Create{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  .env.local
                </code>{" "}
                file in project root:
              </li>
            </ol>
            <div className="bg-gray-100 rounded p-4 mt-3 overflow-x-auto">
              <pre className={`${geistMono.className} text-sm text-gray-700`}>
                {`TELEGRAM_BOT_TOKEN=your_token_here
CRON_SECRET=test-secret-key`}
              </pre>
            </div>
            <ol
              className="list-decimal list-inside space-y-2 text-gray-700 mt-4"
              start="2"
            >
              <li>
                Install dependencies:{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  npm install
                </code>
              </li>
              <li>
                Run locally:{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  npm run dev
                </code>
              </li>
            </ol>
            <p className="text-gray-600 mt-3">
              Your bot is now running at:{" "}
              <code
                className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
              >
                http://localhost:3000
              </code>
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <span>3️⃣</span> Use ngrok to Expose Locally (1 min)
            </h2>
            <p className="text-gray-700 mb-3">
              To test with actual Telegram (not just locally):
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Download{" "}
                <a
                  href="https://ngrok.com/download"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ngrok
                </a>
              </li>
              <li>
                Run:{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  ngrok http 3000
                </code>
              </li>
              <li>
                Copy the HTTPS URL (e.g.,{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  https://abc123.ngrok.io
                </code>
                )
              </li>
            </ol>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <span>4️⃣</span> Connect Bot to Your Webhook
            </h2>
            <p className="text-gray-700 mb-3">
              Message <strong>BotFather</strong> on Telegram:
            </p>
            <div className="bg-gray-100 rounded p-4 overflow-x-auto">
              <pre className={`${geistMono.className} text-sm text-gray-700`}>
                {`/setwebhook
https://abc123.ngrok.io/api/telegram`}
              </pre>
            </div>
            <p className="text-gray-600 mt-3">
              BotFather will confirm: ✅ "Webhook was set"
            </p>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <span>5️⃣</span> Test Your Bot!
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Go to your bot (search by username)</li>
              <li>
                Click "Start" or type{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  start
                </code>
              </li>
              <li>Select subjects for each time slot</li>
              <li>See your schedule appear!</li>
            </ol>
          </div>

          {/* What Works */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              What Works Right Now
            </h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                ✅ Manual{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  /start
                </code>{" "}
                command - test anytime
              </li>
              <li>✅ Interactive subject selection</li>
              <li>✅ Auto-generated schedule</li>
              <li>
                ❌ Daily 7 AM reminder - requires deployed bot (see next step)
              </li>
            </ul>
          </div>

          {/* Deploy to Production */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Deploy to Production (Optional)
            </h2>
            <p className="text-gray-700 mb-4">
              Ready to go live with 7 AM reminders?
            </p>

            <h3 className="font-bold text-gray-800 mb-2">
              Deploy to Vercel (Free):
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
              <li>Push code to GitHub</li>
              <li>
                Go to{" "}
                <a
                  href="https://vercel.com"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  vercel.com
                </a>
              </li>
              <li>Import your repository</li>
              <li>
                Add environment variables:{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  TELEGRAM_BOT_TOKEN
                </code>{" "}
                and{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  CRON_SECRET
                </code>
              </li>
              <li>Deploy!</li>
            </ol>

            <h3 className="font-bold text-gray-800 mb-2">
              Set Webhook in Telegram:
            </h3>
            <p className="text-gray-700 mb-2">
              Message <strong>BotFather</strong>:
            </p>
            <div className="bg-gray-100 rounded p-4 overflow-x-auto mb-4">
              <pre className={`${geistMono.className} text-sm text-gray-700`}>
                {`/setwebhook
https://your-project.vercel.app/api/telegram`}
              </pre>
            </div>

            <h3 className="font-bold text-gray-800 mb-2">
              Set Daily Reminder (7 AM):
            </h3>
            <p className="text-gray-700 mb-2">
              Go to{" "}
              <a
                href="https://cron-job.org"
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                cron-job.org
              </a>{" "}
              and create:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>
                <strong>URL</strong>:{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  https://your-project.vercel.app/api/cron/schedule
                </code>
              </li>
              <li>
                <strong>Method</strong>: POST
              </li>
              <li>
                <strong>Header</strong>:{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  x-cron-secret: your-secret-key
                </code>
              </li>
              <li>
                <strong>Schedule</strong>: 7:00 AM daily
              </li>
            </ul>
          </div>

          {/* File Reference */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              File Reference
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-bold text-gray-800">
                      File
                    </th>
                    <th className="text-left py-2 font-bold text-gray-800">
                      Purpose
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b">
                    <td className="py-2">
                      <code
                        className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                      >
                        lib/telegram-bot.ts
                      </code>
                    </td>
                    <td>Telegram API calls</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">
                      <code
                        className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                      >
                        lib/schedule.ts
                      </code>
                    </td>
                    <td>Store/manage user schedules</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">
                      <code
                        className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                      >
                        lib/handlers.ts
                      </code>
                    </td>
                    <td>Handle messages & buttons</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">
                      <code
                        className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                      >
                        app/api/telegram/route.ts
                      </code>
                    </td>
                    <td>Webhook endpoint</td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <code
                        className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                      >
                        app/api/cron/schedule.ts
                      </code>
                    </td>
                    <td>Daily 7 AM trigger</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* BotFather Commands */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Useful BotFather Commands
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-bold text-gray-800">
                      Command
                    </th>
                    <th className="text-left py-2 font-bold text-gray-800">
                      What it does
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  <tr className="border-b">
                    <td className="py-2">
                      <code
                        className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                      >
                        /newbot
                      </code>
                    </td>
                    <td>Create a new bot</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">
                      <code
                        className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                      >
                        /mybots
                      </code>
                    </td>
                    <td>See your bots</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">
                      <code
                        className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                      >
                        /setwebhook
                      </code>
                    </td>
                    <td>Set webhook URL</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">
                      <code
                        className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                      >
                        /deletewebhook
                      </code>
                    </td>
                    <td>Remove webhook</td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <code
                        className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                      >
                        /getwebhookinfo
                      </code>
                    </td>
                    <td>Check webhook status</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
