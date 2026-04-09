"use client";

import Link from "next/link";
import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({ subsets: ["latin"] });

export default function CronSetup() {
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
            🕐 Setting Up Daily 7 AM Reminders
          </h1>
          <p className="text-gray-600">
            Your bot is ready to send automatic reminders at 7 AM every day.
            Here's how to set it up.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-8">
          {/* Option 1: cron-job.org */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <span>1️⃣</span> cron-job.org (Easiest - 5 minutes)
            </h2>

            <h3 className="font-bold text-gray-800 mb-3">
              Step 1: Sign Up (Free)
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6">
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
              <li>Click "Sign up for free"</li>
              <li>Create account and verify email</li>
            </ol>

            <h3 className="font-bold text-gray-800 mb-3">
              Step 2: Create New Cronjob
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
              <li>Click "Create Cronjob"</li>
              <li>Fill in:</li>
            </ol>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="space-y-3">
                <div>
                  <strong className="text-gray-800">Title:</strong>
                  <div className="bg-white rounded px-3 py-2 mt-1 border">
                    <code
                      className={`${geistMono.className} text-sm text-gray-700`}
                    >
                      Study Bot Daily Reminder
                    </code>
                  </div>
                </div>

                <div>
                  <strong className="text-gray-800">URL:</strong>
                  <div className="bg-white rounded px-3 py-2 mt-1 border">
                    <code
                      className={`${geistMono.className} text-sm text-gray-700`}
                    >
                      https://your-project.vercel.app/api/cron/schedule
                    </code>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    (Replace with your actual URL)
                  </p>
                </div>

                <div>
                  <strong className="text-gray-800">Request Method:</strong>
                  <div className="bg-white rounded px-3 py-2 mt-1 border">
                    <code
                      className={`${geistMono.className} text-sm text-gray-700`}
                    >
                      POST
                    </code>
                  </div>
                </div>

                <div>
                  <strong className="text-gray-800">Execution Times:</strong>
                  <ul className="mt-1 text-sm text-gray-700">
                    <li>• Click "Advanced"</li>
                    <li>
                      • Set to: <strong>Every day at 7:00 AM</strong> (select
                      your timezone)
                    </li>
                  </ul>
                </div>

                <div>
                  <strong className="text-gray-800">
                    HTTP Headers (Important!):
                  </strong>
                  <ul className="mt-1 text-sm text-gray-700">
                    <li>• Click "Add Header"</li>
                    <li>
                      • <strong>Key</strong>:{" "}
                      <code
                        className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                      >
                        x-cron-secret
                      </code>
                    </li>
                    <li>
                      • <strong>Value</strong>: The secret from your{" "}
                      <code
                        className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                      >
                        CRON_SECRET
                      </code>{" "}
                      env variable (e.g., "your-super-secret-key-123")
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <ol
              className="list-decimal list-inside space-y-2 text-gray-700"
              start="3"
            >
              <li>Click "Create"</li>
            </ol>

            <div className="bg-green-50 rounded-lg p-4 mt-4">
              <h4 className="font-bold text-green-800 mb-2">Verify It Works</h4>
              <ol className="list-decimal list-inside space-y-1 text-green-700 text-sm">
                <li>You should see your job in the dashboard</li>
                <li>
                  Click the job and select "Force execution" to test immediately
                </li>
                <li>
                  Check your Telegram bot - it should send a message to all
                  users!
                </li>
              </ol>
            </div>
          </div>

          {/* Option 2: Upstash */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <span>2️⃣</span> Upstash (Alternative - 5 minutes)
            </h2>

            <h3 className="font-bold text-gray-800 mb-3">
              Step 1: Create Upstash Account
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6">
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
              <li>Sign up (free tier available)</li>
              <li>Create a new QStash project</li>
            </ol>

            <h3 className="font-bold text-gray-800 mb-3">
              Step 2: Create Scheduled Message
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
              <li>Go to QStash console</li>
              <li>Click "Schedule" → "Create Schedule"</li>
              <li>Fill in:</li>
            </ol>

            <div className="bg-purple-50 rounded-lg p-4 mb-6">
              <div className="space-y-3">
                <div>
                  <strong className="text-gray-800">Endpoint:</strong>
                  <div className="bg-white rounded px-3 py-2 mt-1 border">
                    <code
                      className={`${geistMono.className} text-sm text-gray-700`}
                    >
                      https://your-project.vercel.app/api/cron/schedule
                    </code>
                  </div>
                </div>

                <div>
                  <strong className="text-gray-800">
                    Schedule Pattern (Cron):
                  </strong>
                  <div className="bg-white rounded px-3 py-2 mt-1 border">
                    <code
                      className={`${geistMono.className} text-sm text-gray-700`}
                    >
                      0 7 * * *
                    </code>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    (This means: 7:00 AM every day)
                  </p>
                </div>

                <div>
                  <strong className="text-gray-800">Headers:</strong>
                  <ul className="mt-1 text-sm text-gray-700">
                    <li>• Click "Add Header"</li>
                    <li>
                      • <strong>Key</strong>:{" "}
                      <code
                        className={`${geistMono.className} bg-gray-100 px-2 py-1 rounded text-gray-700`}
                      >
                        x-cron-secret
                      </code>
                    </li>
                    <li>
                      • <strong>Value</strong>: Your secret key
                    </li>
                  </ul>
                </div>

                <div>
                  <strong className="text-gray-800">Method:</strong>
                  <div className="bg-white rounded px-3 py-2 mt-1 border">
                    <code
                      className={`${geistMono.className} text-sm text-gray-700`}
                    >
                      POST
                    </code>
                  </div>
                </div>
              </div>
            </div>

            <ol
              className="list-decimal list-inside space-y-2 text-gray-700"
              start="4"
            >
              <li>Create schedule</li>
            </ol>
            <p className="text-green-700 font-bold mt-2">Done! ✅</p>
          </div>

          {/* Option 3: AWS EventBridge */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <span>3️⃣</span> AWS EventBridge (Advanced - 10 minutes)
            </h2>
            <p className="text-gray-700 mb-4">If you're already using AWS:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Go to AWS Console → EventBridge</li>
              <li>Create new rule</li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
