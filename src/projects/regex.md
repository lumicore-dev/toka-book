# Regex Engine

Build a regular expression engine using the `toka-regex` library, which implements a Thompson NFA (Nondeterministic Finite Automaton).

## What is Thompson NFA?

A Thompson NFA compiles a regex pattern into a state machine that can match strings efficiently. It works by:

1. **Compiling** the pattern into a graph of states
2. **Simulating** all possible paths simultaneously
3. **Accepting** if any path reaches an accept state

## Basic Usage

```tokalang
import regex::{Regex}

import std/io::println

fn example() {
    auto re = Regex::new("hello|world")
    
    if re.test(string::from("hello world")) {
        println("Match found!")
    }
}
```

## Pattern Syntax

The engine supports standard regex patterns:

| Pattern | Matches |
|---------|---------|
| `abc` | Literal string "abc" |
| `a|b` | Either "a" or "b" |
| `a*` | Zero or more "a"s |
| `a+` | One or more "a"s |
| `a?` | Optional "a" (zero or one) |
| `[abc]` | Character class: a, b, or c |
| `[^abc]` | Negated character class |
| `.` | Any single character |

## Matching

```tokalang
import std/io::println
import core/option::Option

fn example() {
    auto re = Regex::new("\\d+")  // One or more digits
    
    match re.find(string::from("Order #42")) {
        auto Option::Some(m) => println("Found: {}", m.text),
        auto Option::None => println("No match")
    }
}
```

## Replacing

```tokalang
import std/io::println

fn example() {
    auto re = Regex::new("\\s+")
    auto result = re.replace(string::from("hello    world"), string::from(" "))
    println("{}", result)  // "hello world"
}
```

## The Engine Architecture

The regex engine is built in pure Toka:

- **Pattern Compiler** — Parses the regex string into NFA states
- **State Simulator** — Runs the NFA against input text
- **Matcher** — Handles capture groups and position tracking

This makes it a great example of how Toka can implement non-trivial algorithms with clean, safe code.
