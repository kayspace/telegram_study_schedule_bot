"use client";

import Link from "next/link";
import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({ subsets: ["latin"] });

export default function FullGuide() {
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
            📚 Telegram Study Schedule Bot - Setup Guide
          </h1>
          <p className="text-gray-600">
            This is a fully automated Telegram bot that helps users plan their
            study schedule with daily reminders at 7 AM.
          </p>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Features</h2>
          <ul className="space-y-2 text-gray-700">
            <li>
              ✅{" "}
              <strong>
                Manual{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  /start
                </code>{" "}
                command
              </strong>{" "}
              - Begin scheduling anytime (for testing)
            </li>
            <li>
              ✅ <strong>Daily 7 AM automatic trigger</strong> - Sends schedule
              prompts automatically
            </li>
            <li>
              ✅ <strong>Interactive subject selection</strong> - Choose from 7
              subjects across 4 time slots
            </li>
            <li>
              ✅ <strong>Auto-generated timetable</strong> - Bot creates and
              displays your complete schedule
            </li>
          </ul>
        </div>

        {/* Time Slots & Subjects */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-3 text-gray-800">Time Slots</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>
                <strong>Slot 1</strong>: 8:30 AM - 11:00 AM
              </li>
              <li>
                <strong>Slot 2</strong>: 12:10 PM - 2:00 PM
              </li>
              <li>
                <strong>Slot 3</strong>: 2:40 PM - 5:40 PM
              </li>
              <li>
                <strong>Slot 4</strong>: 7:30 PM - 10:00 PM
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-3 text-gray-800">
              Available Subjects
            </h3>
            <ol className="space-y-1 text-gray-700 text-sm">
              <li>1. Aerodynamics</li>
              <li>2. Space Dynamics</li>
              <li>3. Propulsion</li>
              <li>4. Structures</li>
              <li>5. Flight Mechanics</li>
              <li>6. Mathematics</li>
              <li>7. Aptitude</li>
            </ol>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <span>1️⃣</span> Create a Telegram Bot (2 minutes)
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Open <strong>Telegram</strong> app
              </li>
              <li>
                Search for <strong>"BotFather"</strong> (official Telegram bot
                for creating bots)
              </li>
              <li>
                Type{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  /newbot
                </code>
              </li>
              <li>Choose a name (e.g., "Study Schedule Bot")</li>
              <li>
                Choose a username (must be unique, e.g.,
                "study_schedule_bot_123")
              </li>
              <li>
                <strong>Copy the API Token</strong> - looks like:{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  123456789:ABCDefGhijKlmnoPqrsTuvWxyz-1A2B3C4D
                </code>
              </li>
            </ol>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <span>2️⃣</span> Deploy Your Bot
            </h2>

            <h3 className="font-bold text-gray-800 mb-3">
              Option A: Deploy to Vercel (Recommended - Free)
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6">
              <li>Push your code to GitHub</li>
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
              <li>Click "New Project" and import your GitHub repository</li>
              <li>
                Add environment variables in Vercel dashboard:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>
                    <code
                      className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                    >
                      TELEGRAM_BOT_TOKEN
                    </code>
                    : Paste your API token from BotFather
                  </li>
                  <li>
                    <code
                      className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                    >
                      CRON_SECRET
                    </code>
                    : Create any random string (e.g.,
                    "your-super-secret-key-123")
                  </li>
                </ul>
              </li>
              <li>Deploy!</li>
            </ol>
            <p className="text-gray-600 mb-6">
              Your webhook URL will be:{" "}
              <code
                className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
              >
                https://your-project.vercel.app/api/telegram
              </code>
            </p>

            <h3 className="font-bold text-gray-800 mb-3">
              Option B: Run Locally
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Create{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  .env.local
                </code>{" "}
                file:
              </li>
            </ol>
            <div className="bg-gray-100 rounded p-4 mt-3 mb-4 overflow-x-auto">
              <pre className={`${geistMono.className} text-sm text-gray-700`}>
                {`TELEGRAM_BOT_TOKEN=123456789:ABCDefGhijKlmnoPqrsTuvWxyz-1A2B3C4D
CRON_SECRET=your-super-secret-key-123`}
              </pre>
            </div>
            <ol
              className="list-decimal list-inside space-y-2 text-gray-700"
              start="2"
            >
              <li>
                Run:{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  npm run dev
                </code>
              </li>
              <li>
                Your local URL:{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  http://localhost:3000/api/telegram
                </code>
              </li>
              <li>
                Use a service like ngrok to expose locally:{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  ngrok http 3000
                </code>
              </li>
            </ol>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <span>3️⃣</span> Set Webhook URL
            </h2>
            <p className="text-gray-700 mb-4">
              The webhook URL tells Telegram where to send user messages.
            </p>

            <h3 className="font-bold text-gray-800 mb-3">
              Using BotFather (Easiest):
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
              <li>
                Open Telegram, message <strong>BotFather</strong>
              </li>
              <li>
                Type{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  /mybots
                </code>{" "}
                → select your bot → "API Token"
              </li>
              <li>
                Go back to chat and type{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  /setwebhook
                </code>
              </li>
              <li>
                Send your webhook URL:{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  https://your-project.vercel.app/api/telegram
                </code>
              </li>
              <li>BotFather will confirm: "Webhook was set"</li>
            </ol>

            <h3 className="font-bold text-gray-800 mb-3">Using cURL:</h3>
            <div className="bg-gray-100 rounded p-4 overflow-x-auto">
              <pre className={`${geistMono.className} text-sm text-gray-700`}>
                {`curl -X POST https://api.telegram.org/bot{YOUR_TOKEN}/setWebhook \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://your-project.vercel.app/api/telegram"}'`}
              </pre>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <span>4️⃣</span> Set Daily 7 AM Reminder (Cron Job)
            </h2>
            <p className="text-gray-700 mb-4">
              Your bot will send daily prompts to all users at 7 AM. Use a free
              cron service:
            </p>

            <h3 className="font-bold text-gray-800 mb-3">
              Using cron-job.org (Free - Recommended):
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
              <li>
                Go to{" "}
                <a
                  href="https://cron-job.org"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  cron-job.org
                </a>
              </li>
              <li>Sign up (free)</li>
              <li>Click "Create Cronjob"</li>
              <li>
                Fill in:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>
                    <strong>Title</strong>: "Study Bot Daily Reminder"
                  </li>
                  <li>
                    <strong>URL</strong>:{" "}
                    <code
                      className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                    >
                      https://your-project.vercel.app/api/cron/schedule
                    </code>
                  </li>
                  <li>
                    <strong>Request Method</strong>:{" "}
                    <code
                      className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                    >
                      POST
                    </code>
                  </li>
                  <li>
                    <strong>HTTP Headers</strong>: Add custom header:
                    <ul className="list-disc list-inside ml-6">
                      <li>
                        <strong>Key</strong>:{" "}
                        <code
                          className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                        >
                          x-cron-secret
                        </code>
                      </li>
                      <li>
                        <strong>Value</strong>: The secret from your{" "}
                        <code
                          className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                        >
                          CRON_SECRET
                        </code>{" "}
                        env variable
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Schedule</strong>: Set to run daily at 7:00 AM
                    (choose your timezone)
                  </li>
                </ul>
              </li>
              <li>Save!</li>
            </ol>

            <h3 className="font-bold text-gray-800 mb-3">
              Using Upstash (Free - Alternative):
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Go to{" "}
                <a
                  href="https://upstash.com"
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  upstash.com
                </a>
              </li>
              <li>Sign up and create a QStash project</li>
              <li>
                Create a scheduled message:
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>
                    <strong>Endpoint</strong>:{" "}
                    <code
                      className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                    >
                      https://your-project.vercel.app/api/cron/schedule
                    </code>
                  </li>
                  <li>
                    <strong>Schedule</strong>:{" "}
                    <code
                      className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                    >
                      0 7 * * *
                    </code>{" "}
                    (7 AM daily)
                  </li>
                  <li>
                    <strong>Headers</strong>:{" "}
                    <code
                      className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                    >
                      x-cron-secret: your-secret-key
                    </code>
                  </li>
                  <li>
                    <strong>Method</strong>:{" "}
                    <code
                      className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                    >
                      POST
                    </code>
                  </li>
                </ul>
              </li>
            </ol>
          </div>

          {/* Step 5 */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <span>5️⃣</span> Test Your Bot
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
              <li>Open Telegram</li>
              <li>Search for your bot (the username you created)</li>
              <li>Click "Start"</li>
              <li>
                <strong>Or</strong> send the message:{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  start
                </code>
              </li>
              <li>Select subjects for each time slot</li>
              <li>Bot will show your complete schedule!</li>
            </ol>

            <h3 className="font-bold text-gray-800 mb-2">
              Test Manual Start Anytime:
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>
                Type{" "}
                <code
                  className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                >
                  /start
                </code>{" "}
                → Bot will reset and start the schedule process again
              </li>
              <li>Perfect for testing!</li>
            </ul>
          </div>

          {/* How It Works */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              How It Works
            </h2>
            <h3 className="font-bold text-gray-800 mb-3">
              User Interaction Flow:
            </h3>
            <div className="bg-gray-100 rounded p-4 overflow-x-auto">
              <pre className={`${geistMono.className} text-sm text-gray-700`}>
                {`User sends /start
        ↓
Bot asks: "Select subject for Slot 1 (8:30 AM - 11:00 AM)"
        ↓
User clicks a subject button
        ↓
Bot asks: "Select subject for Slot 2 (12:10 PM - 2:00 PM)"
        ↓
User clicks a subject button`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
