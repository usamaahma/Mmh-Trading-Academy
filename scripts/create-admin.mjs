import { createInterface } from "node:readline/promises";
import { stdin, stdout } from "node:process";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User.js";

function promptHidden(label) {
  if (!stdin.isTTY) {
    throw new Error("Run this command directly in a terminal to enter the password securely.");
  }

  stdout.write(label);
  stdin.setRawMode(true);
  stdin.resume();

  return new Promise((resolve) => {
    let value = "";
    const onData = (input) => {
      for (const character of input.toString("utf8")) {
        if (character === "\u0003") {
          stdin.setRawMode(false);
          stdout.write("\n");
          process.exit(130);
        }

        if (character === "\r" || character === "\n") {
          stdin.off("data", onData);
          stdin.setRawMode(false);
          stdout.write("\n");
          resolve(value);
          return;
        }

        if (character === "\u007f" || character === "\b") {
          if (value.length) {
            value = value.slice(0, -1);
            stdout.write("\b \b");
          }
        } else if (character >= " ") {
          value += character;
          stdout.write("*");
        }
      }
    };

    stdin.on("data", onData);
  });
}

const terminal = createInterface({ input: stdin, output: stdout });
let connectionOpen = false;

try {
  const username = (await terminal.question("New admin username: ")).trim().toLowerCase();
  terminal.close();

  if (!username) throw new Error("Username cannot be empty.");

  const password = await promptHidden("New admin password (minimum 12 characters): ");
  if (password.length < 12) throw new Error("Use a password with at least 12 characters.");
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is missing from .env.local.");

  await mongoose.connect(process.env.MONGODB_URI);
  connectionOpen = true;

  if (await User.exists({ role: "ADMIN" })) {
    throw new Error("An admin already exists. Use the admin panel to create another one.");
  }

  if (await User.exists({ username })) {
    throw new Error("That username already exists. Choose another username.");
  }

  await User.create({
    username,
    password: await bcrypt.hash(password, 12),
    role: "ADMIN",
  });

  console.log(`Admin account created for ${username}.`);
} catch (error) {
  terminal.close();
  console.error(error.message);
  process.exitCode = 1;
} finally {
  if (connectionOpen) await mongoose.disconnect();
}