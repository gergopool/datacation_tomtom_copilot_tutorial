# Exercise Steps

## Welcome

Welcome to the **Agentic Coding Exercise**!

You're looking at a simple snake game. It works... but it's missing a lot. No food, no score, questionable code quality. Perfect.

Over the next 8 steps, you'll use **GitHub Copilot** to improve this game — and learn how to work *with* an AI agent effectively. You'll explore, build features, make mistakes (on purpose!), and discover why *how you ask* matters as much as *what you ask*.

---

## Step 1: Explore the codebase

Before changing anything, let's understand what we're working with.

Open **GitHub Copilot Chat** and switch to **Ask mode** (use the mode dropdown at the bottom). In Ask mode, Copilot is **read-only** — it can analyze code but won't edit anything. Safe for exploration.

Select **GPT-5 mini** as the model (click the model selector). It's fast and lightweight — perfect for a quick summary.

Now ask it to explain this project: what it does, how to run it, what's missing, what could be improved.

<details><summary>Hint</summary>

Try: *"Summarize this project. What does it do, how do I run it, and what's missing or could be improved?"*

</details>

---

## Step 2: Feed the snake

Have you noticed our snake is hungry? Poor thing just slithers around with nothing to eat.

In classic snake games, food appears on the board — the snake eats it, grows longer, and new food spawns. Let's add that! There's a `food.png` sprite in the assets folder.

Switch Copilot to **Agent mode** and select **Gemini 3 Flash** as the model — it's a stronger coding model, still cheap (0.33 credits). Ask it to add food using this sprite. Be specific about the behavior you want: the snake eats the food, grows by one segment, the eaten food disappears, and a new food appears at a random spot.

Once it's done, run the game and see how it feels.

<details><summary>Hint</summary>

Try: *"Add a food mechanic. Use assets/food.png as the sprite. When the snake's head reaches the food, the snake grows by one segment, the food disappears, and new food spawns at a random grid position."*

</details>

---

## Step 3: It works, but...

The game runs great. Food appears, snake eats it, everything looks perfect. Ship it, right?

Not so fast. Check the file size of `food.png` — it's **34 MB**, an 8192x8192 image. Your game draws it at 20x20 pixels. That's like loading your wallet with $1000 when you just want to buy some bread in the corner shop.

The AI did exactly what you asked. The code works. But you're silently wasting resources because your instructions said nothing about asset size or format. This is **vibe coding** — it works, so we move on, when we could easily do much better.

**Lesson:** As engineers, we verify not just *that* it works, but *how* it works.

<details><summary>Hint</summary>

Run `ls -lh assets/food.png` in the terminal to see the file size. Then think: what size and format would actually make sense for a 20x20 sprite?

</details>

---

## Step 4: Fix the asset

Let's fix the bloated asset. **Open a new chat** and ask Copilot to write a quick script that converts `food.png` to a **128x128 WebP** at 98% quality. Run the script, then update the game code to use the optimized version.

This is a great use of agentic coding — throwaway utility scripts. Let the AI write the boring conversion code so you can focus on the game.

<details><summary>Hint</summary>

Try: *"Write a script that converts assets/food.png to a 128x128 WebP file at 98% quality. Save it as assets/food.webp."* Then run it and update the `foodImage.src` in game.js.

</details>

---

## Step 5: Write a code guide

The asset is fixed — but how do we stop this from happening again?

Create a file called `AGENTS.md` in the project root. This is a **code guide** — a note you leave for the AI. Copilot reads it automatically and follows whatever rules you write here. (It's a cross-tool standard — works with Copilot, Claude, and others.)

Think of it as your project's memory. Anything you want the AI to remember — conventions, constraints, preferences — goes here. For example:

- *"Use optimized image assets (WebP, max 2x display size)"*
- *"Use camelCase for all variable and function names"*
- *"Add emoji to user-facing messages"*
- *"Never create objects inside the game loop"*

Be creative — these are *your* rules.

<details><summary>Hint</summary>

Start simple: 3-5 rules based on what you've learned so far. You can always add more later as you discover new patterns.

</details>

---

## Step 6: Plan before you build

Time for a bigger feature: **scoring + a game-over screen.** The player should see their score go up as they eat food, and when the snake dies, a game-over screen should show the final score.

Start a **fresh chat** with **Gemini 3 Flash** — old context can pile up and quietly degrade the AI's output.

Now, don't jump straight to coding. When you let the AI dive in without a plan, it tends to miss things or lose track of the bigger picture. Instead, ask it to **explore the codebase first**, then **make a plan** — which files to change, what to add, in what order. That plan becomes a checklist: easy for you to follow, and it keeps the model organized so nothing gets skipped.

1. In **Plan mode**, ask Copilot to plan the feature. It may ask you clarifying questions — be ready with answers!
2. Review the plan. Happy? Hit **Start Implementation**. If not, tell the agent what's wrong
3. **Critique** — does the result match the plan? Does it follow your code guide?

<details><summary>Hint</summary>

Try: *"Explore the codebase and plan how to add a score counter and a game-over screen. Don't write code yet — outline which files and functions you'd change, and in what order."*

</details>

---

## Step 7: Refactor (safely!)

AI agents tend to leave junk and silent waste in your codebase — unused variables, messy structure, everything piled into one file. As the human reviewer and maintainer, it's your job to keep things clean.

Imagine a senior teammate reviewed your code and said: *"`game.js` is too long — it's one file with too much logic. Split it up."* Fair point. Let's clean it up.

But wait — **commit your work first!** Refactoring can break things, and you want a safety net to roll back to. This is non-negotiable: always commit before a big restructure.

Done? Now ask Copilot to **refactor** `game.js` — split it into separate modules (e.g., `snake.js`, `input.js`, `renderer.js`). After it's done, run the game. Does it still work?

If not — that's what the commit was for.

<details><summary>Hint</summary>

Try: *"Refactor game.js into separate ES modules: one for snake logic, one for input handling, one for rendering. Update index.html to load them."*

</details>

---

## Step 8: Trust, but verify

A good habit with AI-generated code: regularly ask the agent to write tests and run them. This catches bugs early — including ones the AI introduced itself.

We'll skip the hands-on testing step to keep the workshop on time, but here's the practice: ask Copilot to generate tests in a separate file, run them with `node --test`, and review the results. You'd be surprised how often the AI writes a correct test that exposes a bug in its own code.

For example — try pressing the opposite direction while the snake is moving. Nothing stops it from reversing into itself. A good test would catch that!

<details><summary>Hint</summary>

Try on your own time: *"Write tests for handleKeyPress that verify the snake cannot reverse direction. Run them with node --test."*

</details>

---

## Keep going!

Congratulations — you've completed the exercise!

You've explored, built features, hit a real-world trap, written a code guide, planned before coding, refactored safely, and learned about testing. That's the full agentic coding toolkit.

If you finished early and want to explore further, see how far you can take this snake game! Here are a few ideas:

- Obstacles that appear as the score increases
- The snake speeding up over time
- Poisoned food that shrinks the snake
- A high score leaderboard
- Walls that wrap around instead of killing you

Happy coding!
