# Regex Engine

Build a regular expression engine using the `toka-regex` library, which implements a Thompson NFA (Nondeterministic Finite Automaton).

## What is Thompson NFA?

A Thompson NFA compiles a regex pattern into a state machine that can match strings efficiently. It works by:

1. **Compiling** the pattern into a graph of states
2. **Simulating** all possible paths simultaneously
3. **Accepting** if any path reaches an accept state

## Basic Usage

```toka
import regex::{Regex}

fn example() {
    let re = Regex::new("hello|world")
    
    if re.test("hello world") {
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

```toka
let re = Regex::new("\\d+")  // One or more digits

match re.find("Order #42") {
    Some(m) => println("Found: " + m.text),
    None => println("No match")
}
```

## Replacing

```toka
let re = Regex::new("\\s+")
let result = re.replace("hello    world", " ")
println(result)  // "hello world"
```

## The Engine Architecture

The regex engine is built in pure Toka:

- **Pattern Compiler** — Parses the regex string into NFA states
- **State Simulator** — Runs the NFA against input text
- **Matcher** — Handles capture groups and position tracking

This makes it a great example of how Toka can implement non-trivial algorithms with clean, safe code.
