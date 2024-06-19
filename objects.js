export const objects_temp = [
  
  
  // @ z = -1
  
  // room: the origin
  {
    x: 0,
    y: 0,
    z: -1,
    type: "link",
    content: "/changelog/",
  }, // 0,0 link
  // room: first puzzle
  {
    x: 5,
    y: -2,
    z: -1,
    type: "sign",
    sign: "text",
    title: "failed tutorial :(",
    content: "hi! i was supposed to be a sign that shows you how to move and interact with things but by reading this you probably already know how to do that! good job!\n\nlook at the other sign below too :)",
    fontsize: 0.06,
    fontcolor: "#eee",
  }, // 5,-2 sign
  {
    x: 5,
    y: 2,
    z: -1,
    type: "sign",
    sign: "picture",
    title: "answer :)",
    content: "smile_0",
  }, // 5,2 sign
  {
    x: 8,
    y: 0,
    z: -1,
    type: "panel",
    panel: {
      id: "0_smile",
      name: "click squares",
      w: 5,
      h: 5,
      type: "binary",
      map: `
        22222
        22222
        22222
        22222
        22222
      `,
      answer: `
        01010
        00000
        00000
        10001
        01110
      `,
    },
  }, // 8,0 panel 0_smile
  {
    x: 11,
    y: 0,
    z: -1,
    type: "door",
    door: {
      id: "door_0",
      panels: ["0_smile"],
      rule: "all",
    },
  }, // 11,0 door door_0
  // room: taunt
  {
    x: 15,
    y: 0,
    z: -1,
    type: "panel",
    panel: {
      id: "0_1",
      name: "1",
      w: 3,
      h: 3,
      type: "binary",
      map: "020\n202\n020",
      symbols: {
        number: "...\n.1.\n...",
      },
    },
  }, // 15,0 panel 0_1
  {
    x: 17,
    y: -2,
    z: -1,
    type: "panel",
    panel: {
      id: "0_2",
      name: "2",
      w: 3,
      h: 3,
      type: "binary",
      map: "020\n202\n020",
      symbols: {
        number: "...\n.2.\n...",
      },
    },
  }, // 17,-2 panel 0_2
  {
    x: 17,
    y: 2,
    z: -1,
    type: "panel",
    panel: {
      id: "0_3",
      name: "3",
      w: 3,
      h: 3,
      type: "binary",
      map: "020\n202\n020",
      symbols: {
        number: "...\n.3.\n...",
      },
    },
  }, // 17,2 panel 0_3
  {
    x: 19,
    y: 0,
    z: -1,
    type: "panel",
    panel: {
      id: "0_4",
      name: "4",
      w: 3,
      h: 3,
      type: "binary",
      map: "020\n202\n020",
      symbols: {
        number: "...\n.4.\n...",
      },
    },
  }, // 19,0 panel 0_4
  {
    x: 17,
    y: 0,
    z: -1,
    type: "panel",
    panel: {
      id: "0_5",
      name: "all together",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      00200
      02020
      20202
      02020
      00200`,
      symbols: {
        number: ".....\n..2..\n.1.4.\n..3..\n.....",
      },
    },
    door: {
      rule: "solved",
      at_least: 4,
      panels: ["0_1", "0_2", "0_3", "0_4"],
    },
  }, // 17,0 panel 0_5
  {
    x: 17,
    y: 5,
    z: -1,
    type: "door",
    door: {
      id: "door_0_1234",
      rule: "custom",
      panels: ["0_1", "0_2", "0_3", "0_4"],
    },
  }, // 17,5 door door_0_1234
  {
    x: 17,
    y: -5,
    z: -1,
    type: "door",
    door: {
      id: "door_0_taunt",
      rule: "custom",
      panelx: ["0_5"], // yes panelx
    },
  }, // 17,-5 door door_0_taunt
  {
    x: 22,
    y: 0,
    z: -1,
    type: "door",
    door: {
      id: "door_0_5",
      rule: "correct",
      at_least: 1,
      panels: ["0_5"],
    },
  }, // 22,0 door door_0_5
  // room: secret star
  {
    x: 16,
    y: 7,
    z: -1,
    type: "sign",
    sign: "text",
    title: "you found me!",
    content: ":)",
    fontsize: 0.5,
    fontcolor: "#eee",
  }, // 16,7 sign
  {
    x: 18,
    y: 7,
    z: -1,
    type: "sign",
    sign: "picture",
    title: "a little clue",
    content: "1234_rotated",
  }, // 18,7 sign
  {
    x: 17,
    y: 8,
    z: -1,
    type: "panel",
    panel: {
      id: "0_1234",
      name: ":)",
      w: 3,
      h: 3,
      type: "binary",
      map: `
        222
        222
        222
      `,
      answer: `
        000
        011
        111
      `,
    },
  }, // 17,8 panel 0_1234
  {
    x: 17,
    y: 11,
    z: -1,
    type: "star",
    star: {
      id: "tutorial_2",
    },
  }, // 17,11 star tutorial_2
  // room: a portal?
  {
    x: 25,
    y: 0,
    z: -1,
    type: "portal",
    portal: {
      type: "down",
      x: 25,
      y: 0,
      z: 0,
    },
  }, // 25,0 portal to z=0
  // room: diagonal
  {
    x: 45,
    y: 6,
    z: -1,
    type: "portal",
    portal: {
      x: 45,
      y: 6,
      z: 0,
    },
    door: {
      rule: "correct",
      at_least: 2,
      panels: ["corridor_1", "corridor_2", "corridor_3", "corridor_4"],
    },
  }, // 45,6 portal to z=0
  {
    x: 48,
    y: 3,
    z: -1,
    type: "sign",
    sign: "picture",
    title: "hint for that door",
    content: "IA", // IA IA finger up safe tilt check
  }, // 48,3 sign
  {
    x: 41,
    y: 6,
    z: -1,
    type: "door",
    door: {
      id: "door_diag",
      rule: "correct",
      at_least: 1,
      panels: ["diagonal_last"],
    },
  }, // 41,6 door door_diag
  {
    x: 47,
    y: 6,
    z: -1,
    type: "panel",
    panel: {
      id: "diagonal_0",
      name: "diagonal numbers?!",
      w: 3,
      h: 3,
      type: "binary",
      map: "222\n222\n222",
      symbols: {
        diagonal: "...\n.1.\n...",
      },
    },
  }, // 47,6 panel diagonal_0
  {
    x: 47,
    y: 4,
    z: -1,
    type: "panel",
    panel: {
      id: "diagonal_1",
      name: "diagonal 1",
      w: 3,
      h: 3,
      type: "binary",
      map: "222\n222\n222",
      symbols: {
        diagonal: "221\n22.\n.2.",
      },
    },
    door: {
      rule: "solved",
      at_least: 1,
      panels: ["diagonal_0"],
    },
  }, // 47,4 panel diagonal_1
  {
    x: 47,
    y: 8,
    z: -1,
    type: "panel",
    panel: {
      id: "diagonal_2",
      name: "diagonal 2",
      w: 3,
      h: 3,
      type: "binary",
      map: "222\n222\n222",
      symbols: {
        number: "...\n2.3\n.1.",
        diagonal: "12.\n.3.\n...",
      },
    },
    door: {
      rule: "solved",
      at_least: 1,
      panels: ["diagonal_0"],
    },
  }, // 47,8 panel diagonal_2
  {
    x: 45,
    y: 4,
    z: -1,
    type: "panel",
    panel: {
      id: "diagonal_3",
      name: "diagonal 3",
      w: 4,
      h: 4,
      type: "binary",
      map: "2222\n2222\n2222\n2222",
      symbols: {
        diagonal: `
        2.11
        2.3.
        .3.2
        1112
        `,
      },
    },
    door: {
      rule: "solved",
      at_least: 1,
      panels: ["diagonal_1"],
    },
  }, // 45,4 panel diagonal_3
  {
    x: 45,
    y: 8,
    z: -1,
    type: "panel",
    panel: {
      id: "diagonal_4",
      name: "diagonal 4",
      w: 4,
      h: 4,
      type: "binary",
      map: "2222\n2222\n2222\n2222",
      symbols: {
        number: `
        .2.2
        2...
        ..2.
        2..2`,
        diagonal: `
        2...
        ..2.
        .2..
        ....
        `,
      },
    },
    door: {
      rule: "solved",
      at_least: 1,
      panels: ["diagonal_2"],
    },
  }, // 45,8 panel diagonal_4
  {
    x: 43,
    y: 4,
    z: -1,
    type: "panel",
    panel: {
      id: "diagonal_5",
      name: "diagonal 5",
      w: 5,
      h: 5,
      type: "binary",
      map: "22222\n22222\n22222\n22222\n22222",
      symbols: {
        number: `
        ..21.
        ....1
        ...2.
        ....3
        2....`,
        diagonal: `
        ....1
        222..
        .3...
        .132.
        .....
        `,
      },
    },
    door: {
      rule: "solved",
      at_least: 1,
      panels: ["diagonal_3"],
    },
  }, // 43,4 panel diagonal_5
  {
    x: 43,
    y: 8,
    z: -1,
    type: "panel",
    panel: {
      id: "diagonal_6",
      name: "diagonal 6",
      w: 5,
      h: 5,
      type: "binary",
      map: "22222\n22222\n22222\n22222\n22222",
      symbols: {
        number: `
        1...1
        .1.1.
        ..1..
        .....
        ..3..`,
        diagonal: `
        .....
        1.2.1
        .1.1.
        22222
        0...0
        `,
      },
    },
    door: {
      rule: "solved",
      at_least: 1,
      panels: ["diagonal_4"],
    },
  }, // 43,8 panel diagonal_6
  {
    x: 43,
    y: 6,
    z: -1,
    type: "panel",
    panel: {
      id: "diagonal_last",
      name: "diagonal unlocked",
      w: 3,
      h: 3,
      type: "binary",
      map: "000\n020\n000",
      symbols: {
        diagonal: `
        1.1
        ...
        1.1
        `,
      },
    },
    door: {
      rule: "solved",
      at_least: 1,
      panels: ["diagonal_5", "diagonal_6"],
    },
  }, // 43,6 panel diagonal_last
  {
    x: 49,
    y: 6,
    z: -1,
    type: "door",
    door: {
      id: "door_ia", // ia ia finger up safe tilt check
      rule: "custom",
      panels: ["corridor_1", "corridor_2", "corridor_3", "corridor_4", "diagonal_0", "diagonal_1", "diagonal_2", "diagonal_3", "diagonal_4", "diagonal_5", "diagonal_6"],
    },
  }, // 49,6 door door_ia
  // room: IA
  {
    x: 54,
    y: 3,
    z: -1,
    type: "sign",
    sign: "picture",
    title: "clue for below",
    content: "IA_invisible",
  }, // 54,3 sign
  {
    x: 51,
    y: 4,
    z: -1,
    type: "portal",
    portal: {
      x: 51,
      y: 4,
      z: 0,
    },
  }, // 52,4 portal to z=0
  {
    x: 54,
    y: 4,
    z: -1,
    type: "panel",
    panel: {
      id: "IA_invisible",
      name: "see the sign above",
      w: 4,
      h: 4,
      type: "binary",
      map: "2222\n2222\n2222\n2222",
      hide_symbols: true,
      symbols: {
        diagonal: `
        ....
        .50.
        .05.
        ....
        `,
      },
    },
  }, // 54,4 panel IA_invisible
  {
    x: 53,
    y: 4,
    z: -1,
    type: "door",
    door: {
      id: "door_IA_invisible",
      rule: "correct",
      at_least: 1,
      panels: ["IA_invisible"],
    },
  }, // 53,4 door door_IA_invisible
  {
    x: 52,
    y: 9,
    z: -1,
    type: "star",
    star: {
      id: "diagonal_1",
    },
  }, // 52,9 star diagonal_1
  // room: diagonal extras!
  {
    x: 35,
    y: 6,
    z: -1,
    type: "panel",
    panel: {
      id: "diagonal_x1",
      name: "diagonal extra 1",
      w: 4,
      h: 4,
      type: "binary",
      map: "2222\n2222\n2222\n2222",
      symbols: {
        diagonal: `
        1111
        1221
        1221
        1111
        `,
      },
    },
  }, // 35,6 panel diagonal_x1
  {
    x: 37,
    y: 6,
    z: -1,
    type: "panel",
    panel: {
      id: "diagonal_x2",
      name: "diagonal extra 2",
      w: 4,
      h: 4,
      type: "binary",
      map: "2222\n2222\n2222\n2222",
      symbols: {
        diagonal: `
        .22.
        2222
        2222
        .22.
        `,
      },
    },
  }, // 37,6 panel diagonal_x2
  {
    x: 39,
    y: 6,
    z: -1,
    type: "panel",
    panel: {
      id: "diagonal_x3",
      name: "diagonal extra 3",
      w: 4,
      h: 4,
      type: "binary",
      map: "2222\n2222\n2222\n2222",
      symbols: {
        diagonal: `
        .22.
        2442
        2442
        .22.
        `,
      },
    },
  }, // 39,6 panel diagonal_x3
  {
    x: 35,
    y: 8,
    z: -1,
    type: "panel",
    panel: {
      id: "diagonal_x4",
      name: "diagonal extra 4",
      w: 4,
      h: 4,
      type: "binary",
      map: "2222\n2222\n2222\n2222",
      symbols: {
        diagonal: `
        1..1
        .44.
        .44.
        1..1
        `,
      },
    },
  }, // 35,8 panel diagonal_x4
  {
    x: 37,
    y: 8,
    z: -1,
    type: "panel",
    panel: {
      id: "diagonal_x5",
      name: "diagonal extra 5",
      w: 4,
      h: 4,
      type: "binary",
      map: "2222\n2222\n2222\n2222",
      symbols: {
        diagonal: `
        .11.
        1111
        1111
        .11.
        `,
      },
    },
  }, // 37,8 panel diagonal_x5
  {
    x: 39,
    y: 8,
    z: -1,
    type: "panel",
    panel: {
      id: "diagonal_x6",
      name: "diagonal extra 6",
      w: 4,
      h: 4,
      type: "binary",
      map: "2222\n2222\n2222\n2222",
      symbols: {
        diagonal: `
        .22.
        1111
        2..2
        1111
        `,
      },
    },
  }, // 39,8 panel diagonal_x6
  {
    x: 40,
    y: 3,
    z: -1,
    type: "panel",
    panel: {
      id: "diagonal_x7",
      name: "diagonal extra 7",
      w: 5,
      h: 5,
      type: "binary",
      map: "22222\n22222\n22222\n22222\n22222",
      symbols: {
        diagonal: `
        .121.
        12121
        2121.
        12121
        .121.
        `,
      },
    },
  }, // 40,3 panel diagonal_x7
  {
    x: 37,
    y: 10,
    z: -1,
    type: "door",
    door: {
      id: "door_diagx",
      rule: "correct",
      at_least: 6,
      panels: ["diagonal_x1", "diagonal_x2", "diagonal_x3", "diagonal_x4", "diagonal_x5", "diagonal_x6"],
    },
  }, // 37,10 door door_diagx
  // room: basement
  {
    x: 24,
    y: 3,
    z: -1,
    type: "panel",
    panel: {
      id: "basement_unlock",
      name: "basement unlock",
      w: 5,
      h: 5,
      type: "binary",
      map: "22222\n22222\n22222\n22222\n22222",
      symbols: {
        diagonal: `
        12321
        23232
        32.23
        23232
        12321
        `,
      },
    },
  }, // 24,3 panel basement_unlock
  {
    x: 25,
    y: 2,
    z: -1,
    type: "door",
    door: {
      id: "basement_unlock_top",
      rule: "solved",
      at_least: 1,
      panels: ["basement_unlock"],
    },
  }, // 25,2 door basement_unlock_top
  {
    x: 25,
    y: 4,
    z: -1,
    type: "door",
    door: {
      id: "basement_unlock_bottom",
      rule: "solved",
      at_least: 1,
      panels: ["basement_unlock"],
    },
  }, // 25,4 door basement_unlock_bottom
  {
    x: 23,
    y: 11,
    z: -1,
    type: "portal",
    portal: {
      x: 27,
      y: 11,
      z: 0,
    },
  }, // 23,11 portal to z=0
  {
    x: 27,
    y: 11,
    z: -1,
    type: "portal",
    portal: {
      x: 0,
      y: 0,
      z: -99,
    },
  }, // 27,11 portal to z=-99
  // room: a choice
  {
    x: 52,
    y: 2,
    z: -1,
    type: "panel",
    panel: {
      id: "choice_0",
      name: "a choice",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222
      `,
      symbols: {
        number: `
        .3.3.
        .....
        .....
        3.3.3
        .....
        `,
      },
    },
  }, // 52,2 panel choice_0
  {
    x: 52,
    y: 0,
    z: -1,
    type: "door",
    door: {
      id: "door_choice_0",
      rule: "correct",
      at_least: 1,
      panels: ["choice_0"],
    },
  }, // 52,0 door door_choice_0
  // room: that choice
  ...(function() {
    const result = [];
    for (let x = 50; x <= 54; x++) {
      for (let y = -8; y <= -4; y++) {
        result.push({
          x: x,
          y: y,
          z: -1,
          type: "door",
          door: {
            x: x - 50,
            y: y + 8,
            id: "door_choice_0_" + x + "_" + y,
            rule: "custom",
            custom: "door_choice_0",
            panelx: ["choice_0"],
          },
        });
      }
    }
    return result;
  })(), // 50,-8,-1 door_choice_0_50_-8 to 54,-4,-1 door_choice_0_54_-4 (5 × 5 = 25 doors)
  {
    x: 50,
    y: -9,
    z: -1,
    type: "panel",
    panel: {
      id: "choice_0_1",
      name: "choice 1",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222
      `,
      symbols: {
        number: `
        ..2..
        124.0
        ...1.
        12..1
        23.3.
        `,
      },
    },
  }, // 50,-9 panel choice_0_1
  {
    x: 52,
    y: -9,
    z: -1,
    type: "panel",
    panel: {
      id: "choice_0_2",
      name: "choice 2",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222
      `,
      symbols: {
        number: `
        2.3.3
        22.3.
        .33..
        332.0
        3...1
        `,
      },
    },
  }, // 52,-9 panel choice_0_2
  {
    x: 54,
    y: -9,
    z: -1,
    type: "panel",
    panel: {
      id: "choice_0_3",
      name: "choice 3",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222
      `,
      symbols: {
        number: `
        .3322
        1..32
        1233.
        1..33
        .3333
        `,
      },
    },
  }, // 54,-9 panel choice_0_3
  {
    x: 56,
    y: -1,
    z: -1,
    type: "door",
    door: {
      id: "door_choice_0_1",
      rule: "correct",
      at_least: 1,
      panels: ["choice_0_1"],
    },
  }, // 56,-1 door door_choice_0_1
  {
    x: 57,
    y: -1,
    z: -1,
    type: "door",
    door: {
      id: "door_choice_0_2",
      rule: "correct",
      at_least: 1,
      panels: ["choice_0_2"],
    },
  }, // 57,-1 door door_choice_0_2
  {
    x: 58,
    y: -1,
    z: -1,
    type: "door",
    door: {
      id: "door_choice_0_3",
      rule: "correct",
      at_least: 1,
      panels: ["choice_0_3"],
    },
  }, // 58,-1 door door_choice_0_3
  // room: amazing
  {
    x: 56,
    y: -9,
    z: -1,
    type: "panel",
    panel: {
      id: "choice_0_123",
      name: "choices",
      w: 7,
      h: 2,
      type: "binary",
      map: `
      2222222
      2020202
      `,
      hide_symbols: true,
      symbols: {
        number: `
        0010212
        .1.2.3.
        `,
        /*
        number: `
        2..3433
        .1.2.3.
        `,*/
      },
    },
  }, // 56,-9 panel choice_0_123
  {
    x: 56,
    y: -10,
    z: -1,
    type: "sign",
    sign: "text",
    title: "that choice",
    content: "use as little white cells as possible!",
    fontsize: 0.1,
    fontcolor: "#eee",
    textangle: 0.05,
  }, // 56,-10 sign
  {
    x: 64,
    y: -1,
    z: -1,
    type: "panel",
    panel: {
      id: "amazing_1",
      name: "amazing",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222
      `,
      answer: `
      0111
      1101
      1001
      1001
      `,
    },
  }, // 64,-1 panel amazing_1
  {
    x: 66,
    y: -9,
    z: -1,
    type: "panel",
    panel: {
      id: "amazing_2",
      name: "amazing",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222
      `,
      answer: `
      00111
      11101
      10000
      10111
      11101
      `,
    },
  }, // 66,-9 panel amazing_2
  {
    x: 59,
    y: -11,
    z: -1,
    type: "panel",
    panel: {
      id: "amazing_3",
      name: "amazing!?",
      w: 10,
      h: 10,
      type: "binary",
      map: `
      2222222222
      2222222222
      2222222222
      2222222222
      2222222222
      2222222222
      2222222222
      2222222222
      2222222222
      2222222222
      `,
      answer: `
      0001000000
      0111000000
      1100000000
      1001110111
      1011011101
      1010000001
      1010011101
      1110110101
      0000100101
      1111100111
      `,
    },
  }, // 59,-11 panel amazing_3
  // room: amazing star
  {
    x: 59,
    y: -14,
    z: -1,
    type: "star",
    star: {
      id: "amazing_1",
    },
  }, // 59,-14 star amazing_1
  // room: warp: amazing
  {
    x: 69,
    y: -8,
    z: -1,
    type: "portal",
    portal: {
      type: "warp",
      x: 9,
      y: -4,
      z: -99,
    },
  }, // 69,-8 portal to z=-99
  // room: amazing link
  {
    x: 62,
    y: 4,
    z: -1,
    type: "portal",
    portal: {
      x: 62,
      y: 4,
      z: 0,
    },
  }, // 62,4 portal to z=0
  {
    x: 62,
    y: 2,
    z: -1,
    type: "panel",
    panel: {
      id: "amazing_link",
      name: "",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        number: `
        .....
        .3...
        ..3..
        .....
        .....`,
        circle: `
        ....0
        .....
        .....
        .....
        0....`,
        ringnumber: `
        ...9.
        ....9
        .....
        9....
        .9...`,
      },
    },
  }, // 62,2 panel amazing_link
  {
    x: 62,
    y: 1,
    z: -1,
    type: "panel",
    panel: {
      id: "amazing_link_2",
      name: "",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        number: `
        .....
        .4...
        ..4..
        .....
        .....`,
        circle: `
        ....0
        .....
        .....
        .....
        0....`,
        ringnumber: `
        ...9.
        ....9
        .....
        9....
        .9...`,
      },
    },
  }, // 62,1 panel amazing_link_2
  {
    x: 62,
    y: 0,
    z: -1,
    type: "door",
    door: {
      id: "door_amazing_link",
      rule: "solved",
      at_least: 2,
      panels: ["amazing_1", "amazing_link_2"],
    },
  }, // 62,0 door door_amazing_link
  
  
  // @ z = 0
  
  // room: the beginning
  {
    x: 25,
    y: 0,
    z: 0,
    type: "portal",
    portal: {
      x: 25,
      y: 0,
      z: -1,
    },
  }, // 25,0 portal to z=-1
  {
    x: 27,
    y: 0,
    z: 0,
    type: "sign",
    sign: "text",
    title: "welcome sign",
    content: "welcome to the game without a name yet! thank you for testing!\n\nfull completion: ⭐ 6 🧩 138",
    // embark 🌳\n\nright: ruins\nabove: water
    fontsize: 0.06,
    fontcolor: "#eee",
    textangle: -0.1,
  }, // 27,0 sign
  {
    x: 22,
    y: 0,
    z: 0,
    type: "symbol",
    symbol: {
      type: "arrow_left",
    },
  }, // 22,0 symbol arrow_left
  // room: home
  {
    x: 27,
    y: 11,
    z: 0,
    type: "portal",
    portal: {
      x: 23,
      y: 11,
      z: -1,
    },
  }, // 27,11 portal to z=-1
  {
    x: 23,
    y: 11,
    z: 0,
    type: "portal",
    portal: {
      x: 27,
      y: 11,
      z: 1,
    },
  }, // 23,11 portal to z=1
  {
    x: 26,
    y: 5,
    z: 0,
    type: "symbol",
    symbol: {
      type: "save",
    },
  }, // 26,5 symbol save
  {
    x: 27,
    y: 5,
    z: 0,
    type: "symbol",
    symbol: {
      type: "load",
    },
  }, // 27,5 symbol load
  // room: scattered
  {
    x: 29,
    y: 0,
    z: 0,
    type: "panel",
    panel: {
      id: "scattered_0",
      name: "5",
      w: 3,
      h: 3,
      type: "binary",
      map: "020\n222\n020",
      symbols: {
        number: "...\n.5.\n...",
      },
    },
  }, // 29,0 panel scattered_0
  {
    x: 32,
    y: -2,
    z: 0,
    type: "panel",
    panel: {
      id: "scattered_1",
      name: "lots of white here",
      w: 4,
      h: 4,
      type: "binary",
      map: "0220\n2222\n2222\n0220",
      symbols: {
        number: "....\n.44.\n.52.\n....",
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["scattered_0"],
    },
  }, // 32,-2 panel scattered_1
  {
    x: 31,
    y: 2,
    z: 0,
    type: "panel",
    panel: {
      id: "scattered_2",
      name: "wow",
      w: 3,
      h: 3,
      type: "binary",
      map: "222\n222\n220",
      symbols: {
        number: "11.\n12.\n...",
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["scattered_0"],
    },
  }, // 31,2 panel scattered_2
  {
    x: 35,
    y: -3,
    z: 0,
    type: "panel",
    panel: {
      id: "scattered_3",
      name: "easy square",
      w: 4,
      h: 4,
      type: "binary",
      map: "2220\n2222\n2222\n0222",
      symbols: {
        number: "0...\n.33.\n.33.\n...0",
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["scattered_1"],
    },
  }, // 35,-3 panel scattered_3
  {
    x: 34,
    y: 0,
    z: 0,
    type: "panel",
    panel: {
      id: "scattered_4",
      name: "!!!",
      w: 6,
      h: 6,
      type: "binary",
      map: `
      222222
      222222
      222222
      222222
      222222
      222222`,
      symbols: {
        number: `
        3..2.1
        .21.22
        ...13.
        24...4
        ...2..
        .33332
        `,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["scattered_1", "scattered_2"],
    },
  }, // 34,0 panel scattered_4
  {
    x: 34,
    y: 4,
    z: 0,
    type: "panel",
    panel: {
      id: "scattered_5",
      name: "symmetry!",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      02220
      22222
      22222
      22222
      02220`,
      symbols: {
        number: `
        1.1.1
        .2.2.
        2.3.2
        .2.2.
        1.1.1`,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["scattered_2"],
    },
  }, // 34,4 panel scattered_5
  {
    x: 38,
    y: -4,
    z: 0,
    type: "panel",
    panel: {
      id: "scattered_6",
      name: "all over the place",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        number: `
        .2.1.
        1...1
        2.0.2
        33..1
        .32.1`,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["scattered_3"],
    },
  }, // 38,-4 panel scattered_6
  {
    x: 37,
    y: 3,
    z: 0,
    type: "panel",
    panel: {
      id: "scattered_7",
      name: "symmetry??",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        number: `
        1.2.1
        .3.2.
        3.4.3
        .2.2.
        1.2.1`,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["scattered_5"],
    },
  }, // 37,3 panel scattered_7
  {
    x: 39,
    y: 0,
    z: 0,
    type: "panel",
    panel: {
      id: "scattered_last",
      name: "nice!",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      000
      020
      000`,
      symbols: {
        number: `
        .1.
        1.1
        .1.`,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["scattered_4", "scattered_6", "scattered_7"],
    },
  }, // 39,0 panel scattered_last
  {
    x: 32,
    y: -5,
    z: 0,
    type: "panel",
    panel: {
      id: "scattered_lost",
      name: "lost",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        number: `
        2..0
        .1.1
        1.2.
        22.1`,
      },
    },
  }, // 32,-5 panel scattered_lost
  // room: corridor
  {
    x: 40,
    y: 4,
    z: 0,
    type: "panel",
    panel: {
      id: "corridoor",
      name: "corridoor",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        number: `
        333.
        3.33
        33.3
        .333`,
      },
    },
  }, // 40,4 panel corridoor
  // room: 50%
  {
    x: 42,
    y: 9,
    z: 0,
    type: "sign",
    sign: "text",
    title: "if the staircase is blocked",
    content: "solving two among the four (50%) is required to proceed",
    fontsize: 0.08,
    fontcolor: "#fde",
  }, // 42,9 sign
  {
    x: 43,
    y: 6,
    z: 0,
    type: "panel",
    panel: {
      id: "corridor_1",
      name: "1 spam",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        number: `
        1111
        1111
        1111
        1111`,
      },
    },
  }, // 43,6 panel corridor_1
  {
    x: 45,
    y: 4,
    z: 0,
    type: "panel",
    panel: {
      id: "corridor_2",
      name: "2 spam",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        number: `
        2222
        2222
        2222
        2222`,
      },
    },
  }, // 45,4 panel corridor_2
  {
    x: 47,
    y: 6,
    z: 0,
    type: "panel",
    panel: {
      id: "corridor_3",
      name: "3 spam",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        number: `
        .3..
        .333
        333.
        ..3.`,
      },
    },
  }, // 47,6 panel corridor_3
  {
    x: 45,
    y: 8,
    z: 0,
    type: "panel",
    panel: {
      id: "corridor_4",
      name: "4 spam",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        number: `
        ....
        4444
        .444
        ....`,
      },
    },
  }, // 45,8 panel corridor_4
  {
    x: 45,
    y: 6,
    z: 0,
    type: "portal",
    portal: {
      x: 45,
      y: 6,
      z: -1,
    },
    door: {
      rule: "correct",
      at_least: 2,
      panels: ["corridor_1", "corridor_2", "corridor_3", "corridor_4"],
    },
  }, // 45,6 portal to z=-1
  {
    x: 48,
    y: 1,
    z: 0,
    type: "panel",
    panel: {
      id: "corridoor_shortcut_1",
      name: "optional shortcut - top",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        number: `
        1.222
        .12.1
        134.2
        2..3.
        133.2`,
      },
    },
  }, // 48,1 panel corridoor_shortcut_1
  {
    x: 48,
    y: 3,
    z: 0,
    type: "panel",
    panel: {
      id: "corridoor_shortcut_2",
      name: "optional shortcut - bottom",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        number: `
        212.1
        ..21.
        .2..1
        12..3
        ..131`,
      },
    },
  }, // 48,3 panel corridoor_shortcut_2
  {
    x: 48,
    y: 2,
    z: 0,
    type: "door",
    door: {
      id: "door_corridor_shortcut",
      rule: "solved",
      at_least: 2,
      panels: ["corridoor_shortcut_1", "corridoor_shortcut_2"],
    },
  }, // 48,2 door door_corridor_shortcut
  // room: the ruins
  {
    x: 52,
    y: -7,
    z: 0,
    type: "sign",
    sign: "text",
    title: "ruins hint",
    content: "look at your surroundings",
    fontsize: 0.12,
    fontcolor: "#fed",
  }, // 52,-7 sign
  {
    x: 45,
    y: -6,
    z: 0,
    type: "panel",
    panel: {
      id: "ruins_water",
      name: "water",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        ringnumber: `
        1122
        1122
        3133
        3313`,
      },
      hide_symbols: true,
    },
  }, // 45,-6 panel ruins_water
  {
    x: 48,
    y: -7,
    z: 0,
    type: "panel",
    panel: {
      id: "ruins_wall",
      name: "wall",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      222
      222
      222`,
      symbols: {
        ringnumber: `
        444
        141
        111
        `,
      },
      hide_symbols: true,
    },
  }, // 48,-7 panel ruins_wall
  {
    x: 47,
    y: -12,
    z: 0,
    type: "panel",
    panel: {
      id: "ruins_scattered",
      name: "???",
      w: 10,
      h: 10,
      type: "binary",
      map: `
      0021222222
      2222222222
      2222222222
      2222222222
      2222222222
      2222222222
      2222222222
      2222222222
      2222222222
      2222222200`,
      initial: "0001",
      answer: `
      000.000000
      0000000001
      0000001000
      0001000000
      0000000000
      1000010000
      0000000000
      0010000000
      0000000010
      0000010000`,
    },
  }, // 47,-12 panel ruins_scattered
  {
    x: 49,
    y: -4,
    z: 0,
    type: "panel",
    panel: {
      id: "ruins_wire",
      name: "wire",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      answer: `
      0111
      1101
      0111
      1100`,
    },
  }, // 49,-4 panel ruins_wire
  {
    x: 50,
    y: -2,
    z: 0,
    type: "panel",
    panel: {
      id: "ruins_maze",
      name: "path",
      w: 8,
      h: 5,
      type: "binary",
      map: `
      22222222
      22222222
      22222222
      22222222
      22222222`,
      answer: `
      11111100
      10000001
      10001111
      11101000
      00111000`,
    },
  }, // 50,-2 panel ruins_maze
  {
    x: 52,
    y: -3,
    z: 0,
    type: "door",
    door: {
      id: "door_maze",
      rule: "correct",
      at_least: 1,
      panels: ["ruins_maze"],
    },
  }, // 52,-3 door door_maze
  // room: scattered star
  {
    x: 47,
    y: -14,
    z: 0,
    type: "star",
    star: {
      id: "scattered_1",
    },
  }, // 47,-14 star scattered_1
  // room: tiny room + portal
  {
    x: 51,
    y: 4,
    z: 0,
    type: "portal",
    portal: {
      x: 51,
      y: 4,
      z: -1,
    },
  }, // 51,4 portal to z=-1
  // room: trial and error
  {
    x: 55,
    y: -10,
    z: 0,
    type: "panel",
    panel: {
      id: "trial_1",
      name: "",
      w: 2,
      h: 2,
      type: "binary",
      map: `
      22
      22`,
      answer: `
      01
      10`,
    },
  }, // 55,-10 panel trial_1
  {
    x: 58,
    y: -10,
    z: 0,
    type: "panel",
    panel: {
      id: "trial_2",
      name: "",
      w: 2,
      h: 2,
      type: "binary",
      map: `
      22
      22`,
      answer: `
      10
      11`,
    },
  }, // 58,-10 panel trial_2
  {
    x: 55,
    y: -7,
    z: 0,
    type: "panel",
    panel: {
      id: "trial_3",
      name: "",
      w: 2,
      h: 2,
      type: "binary",
      map: `
      22
      22`,
      answer: `
      00
      10`,
    },
  }, // 55,-7 panel trial_3
  {
    x: 58,
    y: -7,
    z: 0,
    type: "panel",
    panel: {
      id: "trial_4",
      name: "",
      w: 2,
      h: 2,
      type: "binary",
      map: `
      22
      22`,
      answer: `
      10
      01`,
    },
  }, // 58,-7 panel trial_4
  {
    x: 60,
    y: -9,
    z: 0,
    type: "panel",
    panel: {
      id: "trial_all",
      name: "",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      answer: `
      0110
      1011
      0010
      1001
      `,
    },
  }, // 60,-9 panel trial_all
  // room: withinst ourselves
  {
    x: 67,
    y: -8,
    z: 0,
    type: "panel",
    panel: {
      id: "trial_among",
      name: "amidst us",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      answer: `
      0111
      1100
      1111
      0101
      `,
    },
  }, // 67,-8 panel trial_among
  // room: addition
  {
    x: 62,
    y: -2,
    z: 0,
    type: "panel",
    panel: {
      id: "trial_addition_1",
      name: "left side",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        number: `
        .2.2
        2.22
        2..2
        2.0.
        `,
      },
    },
  }, // 62,-2 panel trial_addition_1
  {
    x: 66,
    y: -2,
    z: 0,
    type: "panel",
    panel: {
      id: "trial_addition_2",
      name: "right side",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        number: `
        2.2.
        12.1
        1..1
        .232
        `,
      },
    },
  }, // 66,-2 panel trial_addition_2
  {
    x: 60,
    y: 0,
    z: 0,
    type: "panel",
    panel: {
      id: "trial_addition_last",
      name: "",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      answer: `
      1111
      1001
      1001
      1111
      `,
    },
  }, // 60,0 panel trial_addition_last
  // room: central
  {
    x: 54,
    y: -4,
    z: 0,
    type: "panel",
    panel: {
      id: "trial_central",
      name: "",
      w: 6,
      h: 6,
      type: "binary",
      map: `
      222222
      222222
      222222
      222222
      222222
      222222`,
      symbols: {
        number: `
        2.1.3.
        3..2..
        .1..13
        1.2131
        3..2..
        1..232
        `,
      },
    },
  }, // 54,-4 panel trial_central
  {
    x: 58,
    y: 2,
    z: 0,
    type: "panel",
    panel: {
      id: "trial_central_last",
      name: "",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      answer: `
      1010
      0001
      0100
      1101
      `,
    },
  }, // 58,2 panel trial_central_last
  // room: overview
  {
    x: 58,
    y: 4,
    z: 0,
    type: "panel",
    panel: {
      id: "trial_overview",
      name: "combined",
      w: 8,
      h: 8,
      type: "binary",
      map: `
      22222222
      22222222
      22222222
      22222222
      22222222
      22222222
      22222222
      22222222`,
      answer: `
      01100111
      10111100
      00101111
      10010101
      10101111
      00011001
      01001001
      11011111
      `,
    },
  }, // 58,4 panel trial_overview
  {
    x: 58,
    y: 6,
    z: 0,
    type: "door",
    door: {
      id: "door_trial_overview",
      rule: "solved",
      at_least: 1,
      panels: ["trial_overview"],
    },
  }, // 58,6 door door_trial_overview
  {
    x: 58,
    y: 8,
    z: 0,
    type: "panel",
    panel: {
      id: "trial_overview_2",
      name: "combined: walls",
      w: 8,
      h: 8,
      type: "binary",
      map: `
      22222222
      22222222
      22222222
      22222222
      22222222
      22222222
      22222222
      22222222`,
      answer: `
      01100111
      10011100
      10011111
      01100101
      11110010
      11110111
      11110010
      11110000
      `,
    },
  }, // 58,8 panel trial_overview_2
  {
    x: 60,
    y: 8,
    z: 0,
    type: "door",
    door: {
      id: "door_trial_overview_2",
      rule: "solved",
      at_least: 1,
      panels: ["trial_overview_2"],
    },
  }, // 60,8 door door_trial_overview_2
  {
    x: 62,
    y: 8,
    z: 0,
    type: "panel",
    panel: {
      id: "trial_overview_3",
      name: "now XOR",
      w: 8,
      h: 8,
      type: "binary",
      map: `
      22222222
      22222222
      22222222
      22222222
      22222222
      22222222
      22222222
      22222222`,
      answer: `
      00000000
      00100000
      10110000
      11110000
      01011101
      11101110
      10111011
      00101111
      `,
    },
  }, // 62,8 panel trial_overview_3
  {
    x: 64,
    y: 8,
    z: 0,
    type: "door",
    door: {
      id: "door_trial_overview_3",
      rule: "solved",
      at_least: 1,
      panels: ["trial_overview_3"],
    },
  }, // 64,8 door door_trial_overview_3
  {
    x: 66,
    y: 8,
    z: 0,
    type: "star",
    star: {
      id: "trial_1",
    },
  }, // 66,8 star trial_1
  {
    x: 68,
    y: 8,
    z: 0,
    type: "panel",
    panel: {
      id: "trial_shortcut_star",
      name: "link",
      w: 8,
      h: 8,
      type: "binary",
      map: `
      22222222
      22222222
      22222222
      22222222
      22222222
      22222222
      22222222
      22222222`,
      ruin: `
      ..0
      000
      ..0`,
      symbols: {
        ruing: `
        1......1
        .1....1.
        ..1..1..
        ...11...
        ...11...
        ..1..1..
        .1....1.
        1......1
        `,
      },
    },
  }, // 68,8 panel trial_shortcut_star
  {
    x: 68,
    y: 6,
    z: 0,
    type: "door",
    door: {
      id: "door_trial_shortcut_star",
      rule: "solved",
      at_least: 1,
      panels: ["trial_shortcut_star"],
    },
  }, // 68,6 door door_trial_shortcut_star
  {
    x: 54,
    y: 4,
    z: 0,
    type: "panel",
    panel: {
      id: "trial_shortcut",
      name: "link",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        ringnumber: `
        1.5.
        .5.5
        5.5.
        .5.1
        `,
      },
    },
  }, // 54,4 panel trial_shortcut
  {
    x: 53,
    y: 4,
    z: 0,
    type: "door",
    door: {
      id: "door_trial_shortcut",
      rule: "correct",
      at_least: 1,
      panels: ["trial_shortcut"],
    },
  }, // 53,4 door door_trial_shortcut
  {
    x: 62,
    y: 4,
    z: 0,
    type: "portal",
    portal: {
      x: 62,
      y: 4,
      z: -1,
    },
  }, // 62,4 portal to z=-1
  {
    x: 66,
    y: 4,
    z: 0,
    type: "portal",
    portal: {
      x: 66,
      y: 4,
      z: 1,
    },
  }, // 66,4 portal to z=1
  {
    x: 67,
    y: 3,
    z: 0,
    type: "panel",
    panel: {
      id: "trial_shortcut_2",
      name: "link",
      w: 10,
      h: 10,
      type: "binary",
      map: `
      2222222222
      2222222222
      2222222222
      2222222222
      2222222222
      2222222222
      2222222222
      2222222222
      2222222222
      2222222222`,
      ruin: `
      .0......0
      000000000
      .0...0...`,
      symbols: {
        ruing: `
        .1........
        .0........
        .1........
        ..........
        .1........
        .1........
        .1........
        .1........
        .0........
        ..........
        `,
      },
    },
  }, // 67,3 panel trial_shortcut_2
  {
    x: 68,
    y: 2,
    z: 0,
    type: "door",
    door: {
      id: "door_trial_shortcut_2",
      rule: "correct",
      at_least: 1,
      panels: ["trial_shortcut_2"],
    },
  }, // 68,2 door door_trial_shortcut_2
  {
    x: 69,
    y: 1,
    z: 0,
    type: "door",
    door: {
      id: "door_trial_shortcut_2_2",
      rule: "correct",
      at_least: 1,
      panels: ["trial_shortcut_2"],
    },
  }, // 69,1 door door_trial_shortcut_2_2
  // room: westward
  {
    x: 17,
    y: 3,
    z: 0,
    type: "panel",
    panel: {
      id: "ring_0",
      name: "circles?",
      w: 2,
      h: 2,
      type: "binary",
      map: `
      22
      22`,
      symbols: {
        ring: `
        0.
        .0`,
      }
    },
  }, // 17,3 panel ring_0
  {
    x: 17,
    y: 5,
    z: 0,
    type: "panel",
    panel: {
      id: "ring_1",
      name: "disconnection",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      022
      202
      221`,
      symbols: {
        ring: `
        0.0
        .0.
        .0.`,
      }
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["ring_0"],
    },
  }, // 17,5 panel ring_1
  {
    x: 17,
    y: 7,
    z: 0,
    type: "door",
    door: {
      id: "door_ring",
      rule: "correct",
      at_least: 1,
      panels: ["ring_1"],
    },
  }, // 17,7 door door_ring
  // room: a ring
  {
    x: 21,
    y: 8,
    z: 0,
    type: "panel",
    panel: {
      id: "ring_tutorial",
      name: "experimentation",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        ring: `
        0....
        .....
        ..0..
        .....
        ....0`,
      }
    },
  }, // 21,8 panel ring_tutorial
  {
    x: 17,
    y: 9,
    z: 0,
    type: "panel",
    panel: {
      id: "ring_2",
      name: "rings",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      212
      021
      202`,
      symbols: {
        ring: `
        0.0
        .0.
        0.0`,
      }
    },
    door: {
      rule: "solved",
      at_least: 1,
      panels: ["ring_0"],
    },
  }, // 17,9 panel ring_2
  {
    x: 15,
    y: 10,
    z: 0,
    type: "panel",
    panel: {
      id: "ring_3",
      name: "ring spam",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        ring: `
        0000
        0000
        0000
        0000
        `,
      }
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["ring_2"],
    },
  }, // 15,10 panel ring_3
  {
    x: 19,
    y: 10,
    z: 0,
    type: "panel",
    panel: {
      id: "ring_4",
      name: "wings",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      222
      221
      122`,
      symbols: {
        ring: `
        0.0
        0.0
        .00
        `,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["ring_2"],
    },
  }, // 19,10 panel ring_4
  {
    x: 14,
    y: 12,
    z: 0,
    type: "panel",
    panel: {
      id: "ring_5",
      name: "9 rings",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2100
      2022
      2022`,
      symbols: {
        ring: `
        00.0
        0...
        0..0
        0.00
        `,
      }
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["ring_3"],
    },
  }, // 14,12 panel ring_5
  {
    x: 20,
    y: 12,
    z: 0,
    type: "panel",
    panel: {
      id: "ring_6",
      name: "10 rings",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      1222
      2102
      2202
      2212`,
      symbols: {
        ring: `
        .000
        0..0
        0..0
        00.0
        `,
      }
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["ring_4"],
    },
  }, // 20,12 panel ring_6
  {
    x: 15,
    y: 14,
    z: 0,
    type: "panel",
    panel: {
      id: "ring_7",
      name: "rings and things",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      21202
      22222
      22222
      22002
      22222`,
      symbols: {
        ring: `
        0.0.0
        00.0.
        0.000
        0....
        00.00
        `,
      }
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["ring_5"],
    },
  }, // 15,14 panel ring_7
  {
    x: 19,
    y: 14,
    z: 0,
    type: "panel",
    panel: {
      id: "ring_8",
      name: "f ring e",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      21202
      02120
      22222
      22221
      21202`,
      symbols: {
        ring: `
        0.0.0
        .0.0.
        0.0.0
        .0.0.
        0.0.0
        `,
      }
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["ring_6"],
    },
  }, // 19,14 panel ring_8
  {
    x: 17,
    y: 15,
    z: 0,
    type: "panel",
    panel: {
      id: "ring_last",
      name: "a line",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      020
      020
      020`,
      symbols: {
        ring: `
        ...
        0.0
        ...
        `,
      }
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["ring_7", "ring_8"],
    },
  }, // 17,15 panel ring_last
  {
    x: 17,
    y: 17,
    z: 0,
    type: "door",
    door: {
      id: "door_ring_2",
      rule: "solved",
      at_least: 1,
      panels: ["ring_last"],
    },
  }, // 17,17 door door_ring_2
  {
    x: 22,
    y: 15,
    z: 0,
    type: "panel",
    panel: {
      id: "ring_number",
      name: "rings and numbers",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      222
      222
      222`,
      symbols: {
        number: `
        .3.
        .32
        ...`,
        ring: `
        0.0
        0..
        ..0
        `,
      }
    },
  }, // 22,15 panel ring_number
  // room: stairing
  {
    x: 17,
    y: 20,
    z: 0,
    type: "portal",
    portal: {
      x: 17,
      y: 20,
      z: 1,
    },
  }, // 17,20 portal to z=1
  {
    x: 16,
    y: 23,
    z: 0,
    type: "panel",
    panel: {
      id: "stairing_1",
      name: "left option",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        number: `
        2...
        .3..
        ..3.
        ...2
        `,
        ring: `
        .000
        0..0
        0...
        000.
        `,
      }
    },
  }, // 16,23 panel stairing_1
  {
    x: 18,
    y: 23,
    z: 0,
    type: "panel",
    panel: {
      id: "stairing_2",
      name: "right option",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        number: `
        ...1
        .22.
        .34.
        1...
        `,
        circle: `
        0...
        ....
        ....
        ...0
        `,
      }
    },
  }, // 18,23 panel stairing_2
  {
    x: 17,
    y: 26,
    z: 0,
    type: "portal",
    portal: {
      x: 17,
      y: 26,
      z: 1,
    },
  }, // 17,26 portal to z=1
  // room: bring
  {
    x: 24,
    y: 15,
    z: 0,
    type: "panel",
    panel: {
      id: "bring_0",
      name: "bring: W",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      222
      222
      222`,
      symbols: {
        number: `
        2..
        .2.
        ..2`,
        ring: `
        ..0
        0.0
        0..
        `,
      }
    },
  }, // 24,15 panel bring_0
  {
    x: 24,
    y: 14,
    z: 0,
    type: "panel",
    panel: {
      id: "bring_1_1",
      name: "bring: NW",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        number: `
        .3.3
        3.3.
        .3.3
        3.3.`,
        ring: `
        0...
        .0..
        ..0.
        ...0
        `,
      }
    },
  }, // 24,14 panel bring_1_1
  {
    x: 24,
    y: 16,
    z: 0,
    type: "panel",
    panel: {
      id: "bring_1_2",
      name: "bring: SW",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        number: `
        .2.2
        2.2.
        .2.2
        2.2.`,
        ring: `
        0.0.
        .0.0
        0.0.
        .0.0
        `,
      }
    },
  }, // 24,16 panel bring_1_2
  {
    x: 25,
    y: 14,
    z: 0,
    type: "panel",
    panel: {
      id: "bring_2_1",
      name: "bring: N",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        number: `
        .....
        ...4.
        .4.4.
        .4...
        .....`,
        ring: `
        0.0..
        .0..0
        ..0..
        0..0.
        ..0.0
        `,
      }
    },
  }, // 25,14 panel bring_2_1
  {
    x: 25,
    y: 16,
    z: 0,
    type: "panel",
    panel: {
      id: "bring_2_2",
      name: "bring: S",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        number: `
        .....
        .333.
        .3.3.
        .333.
        .....`,
        ring: `
        000.0
        ....0
        0.0.0
        0....
        0.000
        `,
      }
    },
  }, // 25,16 panel bring_2_2
  {
    x: 25,
    y: 15,
    z: 0,
    type: "panel",
    panel: {
      id: "bring_centre",
      name: "bring: centre",
      w: 9,
      h: 9,
      type: "binary",
      map: `
      222222222
      222222222
      222222222
      222222222
      222222222
      222222222
      222222222
      222222222
      222222222`,
      symbols: {
        ringnumber: `
        i.......j
        .........
        .........
        .........
        .........
        .........
        .........
        .........
        l.......k`,
        number: `
        .3333333.
        1......31
        .......31
        13.....31
        13.....31
        13.....31
        13.......
        13......1
        .3333333.`,
      }
    },
  }, // 25,15 panel bring_centre
  {
    x: 26,
    y: 14,
    z: 0,
    type: "panel",
    panel: {
      id: "bring_3_1",
      name: "bring: NE",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        number: `
        2....
        ...3.
        .3.3.
        .3...
        ....2`,
        ring: `
        .00.0
        .0..0
        0.0.0
        0..0.
        0.00.
        `,
      }
    },
  }, // 26,14 panel bring_3_1
  {
    x: 26,
    y: 16,
    z: 0,
    type: "panel",
    panel: {
      id: "bring_3_2",
      name: "bring: SE",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        number: `
        .....
        .444.
        .4.4.
        .444.
        .....`,
        ring: `
        0.0.0
        .....
        ..0..
        .....
        0...0
        `,
      }
    },
  }, // 26,16 panel bring_3_2
  {
    x: 26,
    y: 15,
    z: 0,
    type: "panel",
    panel: {
      id: "bring_4",
      name: "bring: E",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        number: `
        1.1.1
        .1.1.
        1.1.1
        .1.1.
        1.1.1`,
        ring: `
        .0.0.
        0.0.0
        .0.0.
        0.0.0
        .0.0.`,
      }
    },
  }, // 26,15 panel bring_4
  {
    x: 27,
    y: 17,
    z: 0,
    type: "panel",
    panel: {
      id: "bring_triangle",
      name: "bring: triangle?",
      w: 6,
      h: 6,
      type: "binary",
      map: `
      222222
      222222
      222222
      222222
      222222
      222222`,
      ruin: `
      ....00
      ..0..0
      000000`,
      symbols: {
        ruing: `
        1.....
        ......
        ......
        ......
        ......
        .....1`,
        ring: `
        .....0
        ....0.
        ...0..
        ..0...
        .0....
        0.....`,
      },
    },
  }, // 27,17 panel bring_triangle
  {
    x: 28,
    y: 15,
    z: 0,
    type: "portal",
    portal: {
      flip: true,
      x: 28,
      y: 15,
      z: 1,
    },
  }, // 28,15 portal to z=1
  
  
  // @ z = 1
  
  // room: staring (to the right)
  {
    x: 17,
    y: 20,
    z: 1,
    type: "portal",
    portal: {
      x: 17,
      y: 20,
      z: 0,
    },
  }, // 17,20 portal to z=0
  {
    x: 19,
    y: 20,
    z: 1,
    type: "door",
    door: {
      id: "door_staring",
      rule: "custom",
      panels: [],
    },
  }, // 19,20 door door_staring
  {
    x: 15,
    y: 20,
    z: 1,
    type: "panel",
    panel: {
      id: "circle_0",
      name: "more circles?",
      w: 2,
      h: 2,
      type: "binary",
      map: `
      22
      22`,
      symbols: {
        circle: `
        01
        01
        `,
      }
    },
  }, // 15,20 panel circle_0
  // room: star-ing!
  {
    x: 21,
    y: 20,
    z: 1,
    type: "star",
    star: {
      id: "ring_1",
    },
  }, // 21,20 star ring_1
  // room: circles
  {
    x: 13,
    y: 20,
    z: 1,
    type: "panel",
    panel: {
      id: "circle_1",
      name: "colourful circles",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      221
      122
      022`,
      symbols: {
        circle: `
        0.1
        ...
        0.1
        `,
      }
    },
  }, // 13,20 panel circle_1
  {
    x: 12,
    y: 19,
    z: 1,
    type: "panel",
    panel: {
      id: "circle_2_1",
      name: "three types - 1",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        circle: `
        0.1.
        ..2.
        ..1.
        0.2.
        `,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["circle_1"],
    },
  }, // 12,19 panel circle_2_1
  {
    x: 12,
    y: 21,
    z: 1,
    type: "panel",
    panel: {
      id: "circle_2_2",
      name: "three types - 2",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        circle: `
        01..
        ...1
        2...
        ..20
        `,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["circle_1"],
    },
  }, // 12,21 panel circle_2_2
  {
    x: 11,
    y: 20,
    z: 1,
    type: "panel",
    panel: {
      id: "circle_3",
      name: "back to 2 types",
      w: 6,
      h: 6,
      type: "binary",
      map: `
      022220
      212122
      222222
      222222
      222222
      022220`,
      symbols: {
        circle: `
        ......
        .3.4..
        ......
        ...3..
        .4....
        ......
        `,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["circle_2_1", "circle_2_2"],
    },
  }, // 11,20 panel circle_3
  {
    x: 9,
    y: 19,
    z: 1,
    type: "panel",
    panel: {
      id: "circle_4_1",
      name: "huge puzzle",
      w: 8,
      h: 8,
      type: "binary",
      map: `
      02222220
      12222222
      22122222
      22222222
      22222222
      22122222
      22222222
      02222220`,
      symbols: {
        circle: `
        ........
        0.......
        ..1..2..
        ........
        .....1..
        ..2....0
        ........
        ........
        `,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["circle_3"],
    },
  }, // 9,19 panel circle_4_1
  {
    x: 9,
    y: 21,
    z: 1,
    type: "panel",
    panel: {
      id: "circle_4_2",
      name: "large puzzle",
      w: 7,
      h: 7,
      type: "binary",
      map: `
      2121212
      2222222
      2121212
      2222222
      2121212
      2222222
      2121212`,
      symbols: {
        circle: `
        ......0
        .1.....
        .......
        ....2..
        ..0....
        ..1....
        2.....0
        `,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["circle_3"],
    },
  }, // 9,21 panel circle_4_2
  {
    x: 7,
    y: 19,
    z: 1,
    type: "panel",
    panel: {
      id: "circle_5_1",
      name: "some random rings",
      w: 6,
      h: 6,
      type: "binary",
      map: `
      222202
      222222
      222220
      222222
      222222
      202222`,
      symbols: {
        circle: `
        0....0
        ......
        ...... 
        ......
        ......
        0....0
        `,
        ring: `
        ...0..
        0.0...
        .0.0.0
        0.0.0.
        ...0.0
        ..0...
        `,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["circle_4_1"],
    },
  }, // 7,19 panel circle_5_1
  {
    x: 7,
    y: 21,
    z: 1,
    type: "panel",
    panel: {
      id: "circle_5_2",
      name: "circles and rings",
      w: 6,
      h: 6,
      type: "binary",
      map: `
      222222
      222222
      222222
      222222
      222222
      222222`,
      symbols: {
        circle: `
        0.....
        .....0
        1.....
        .....1
        2.....
        .....2
        `,
        ring: `
        ..0...
        0.0.0.
        .000.0
        ..00..
        .....0
        ......
        `,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["circle_4_2"],
    },
  }, // 7,21 panel circle_5_2
  {
    x: 5,
    y: 20,
    z: 1,
    type: "panel",
    panel: {
      id: "circle_last",
      name: "O",
      w: 5,
      h: 3,
      type: "binary",
      map: `
      00000
      22222
      00000`,
      symbols: {
        circle: `
        0...0
        1...1
        2...2
        `,
        ring: `
        ..0..
        ..0..
        ..0..
        `,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["circle_5_1", "circle_5_2"],
    },
  }, // 5,20 panel circle_last
  {
    x: 3,
    y: 20,
    z: 1,
    type: "door",
    door: {
      id: "door_circle",
      rule: "correct",
      at_least: 1,
      panels: ["circle_last"],
    },
  }, // 3,20 door door_circle
  // room: tiny rooms
  {
    x: 17,
    y: 26,
    z: 1,
    type: "portal",
    portal: {
      x: 17,
      y: 26,
      z: 0,
    },
  }, // 17,26 portal to z=0
  {
    x: 15,
    y: 26,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_0",
      name: "(2)",
      w: 2,
      h: 2,
      type: "binary",
      map: `
      22
      22`,
      symbols: {
        ringnumber: `
        2.
        .2
        `,
      }
    },
  }, // 15,26 panel circnum_0
  // room: circled numbers
  {
    x: 13,
    y: 26,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_1",
      name: "3.6",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      222
      212
      222`,
      symbols: {
        ringnumber: `
        ...
        .3.
        ..6
        `,
      }
    },
  }, // 13,26 panel circnum_1
  {
    x: 11,
    y: 24,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_2_1",
      name: "3.1",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      222
      212
      222`,
      symbols: {
        ringnumber: `
        ...
        .3.
        ..1
        `,
      }
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["circnum_1"],
    },
  }, // 11,24 panel circnum_2_1
  {
    x: 11,
    y: 25,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_2_2",
      name: "3.2",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      222
      212
      222`,
      symbols: {
        ringnumber: `
        ...
        .3.
        ..2
        `,
      }
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["circnum_1"],
    },
  }, // 11,25 panel circnum_2_2
  {
    x: 11,
    y: 26,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_2_3",
      name: "3.3",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      222
      212
      222`,
      symbols: {
        ringnumber: `
        ...
        .3.
        ..3
        `,
      }
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["circnum_1"],
    },
  }, // 11,26 panel circnum_2_3
  {
    x: 11,
    y: 27,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_2_4",
      name: "3.4",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      222
      212
      222`,
      symbols: {
        ringnumber: `
        ...
        .3.
        ..4
        `,
      }
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["circnum_1"],
    },
  }, // 11,27 panel circnum_2_4
  {
    x: 11,
    y: 28,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_2_5",
      name: "3.5",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      222
      212
      222`,
      symbols: {
        ringnumber: `
        ...
        .3.
        ..5
        `,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["circnum_1"],
    },
  }, // 11,28 panel circnum_2_5
  {
    x: 10,
    y: 29,
    z: 1,
    type: "door",
    door: {
      id: "door_circnum_2",
      rule: "solved",
      at_least: 4,
      countdown: true,
      panels: ["circnum_2_1", "circnum_2_2", "circnum_2_3", "circnum_2_4", "circnum_2_5"],
    },
  }, // 10,29 door door_circnum_2
  {
    x: 12,
    y: 31,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_3",
      name: "",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      222
      222
      222`,
      symbols: {
        ringnumber: `
        22.
        444
        333
        `,
      },
    },
  }, // 12,31 panel circnum_3
  {
    x: 10,
    y: 33,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_4_1",
      name: "(1) spam",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        ringnumber: `
        1.1.
        .1.1
        1.1.
        .1.1
        `,
      },
    },
  }, // 10,33 panel circnum_4_1
  {
    x: 11,
    y: 33,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_4_2",
      name: "(2) spam",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        ringnumber: `
        2.2.
        .2.2
        2.2.
        .2.2
        `,
      },
    },
  }, // 11,33 panel circnum_4_2
  {
    x: 12,
    y: 33,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_4_3",
      name: "(3) spam",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        ringnumber: `
        3.3.
        .3.3
        3.3.
        .3.3
        `,
      },
    },
  }, // 12,33 panel circnum_4_3
  {
    x: 13,
    y: 33,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_4_4",
      name: "(5) spam",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        ringnumber: `
        5.5.
        .5.5
        5.5.
        .5.5
        `,
      },
    },
  }, // 13,33 panel circnum_4_4
  {
    x: 14,
    y: 33,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_4_5",
      name: "(6) spam",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        ringnumber: `
        6.6.
        .6.6
        6.6.
        .6.6
        `,
      },
    },
  }, // 14,33 panel circnum_4_5
  {
    x: 9,
    y: 35,
    z: 1,
    type: "door",
    door: {
      id: "door_circnum_4",
      rule: "solved",
      at_least: 4,
      countdown: true,
      panels: ["circnum_4_1", "circnum_4_2", "circnum_4_3", "circnum_4_4", "circnum_4_5"],
    },
  }, // 9,35 door door_circnum_4
  {
    x: 14,
    y: 35,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_lost_1",
      name: "12 trees",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        ringnumber: `
        3.3.3
        .3.3.
        3.3.3
        .3.3.
        3...3
        `,
      },
    },
  }, // 14,35 panel circnum_lost_1
  {
    x: 14,
    y: 36,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_lost_2",
      name: "12 fours",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        ringnumber: `
        4.4.4
        .4.4.
        4.4.4
        .4.4.
        4.4..
        `,
      },
    },
  }, // 14,36 panel circnum_lost_2
  {
    x: 14,
    y: 37,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_lost_3",
      name: "12 sevens",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        ringnumber: `
        7.7.7
        .7.7.
        7.7.7
        .7.7.
        7...7
        `,
      },
    },
  }, // 14,37 panel circnum_lost_3
  {
    x: 6,
    y: 34,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_5",
      name: "wow a big number!",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        ringnumber: `
        a..a
        ....
        ....
        a..a
        `,
      },
    },
  }, // 6,34 panel circnum_5
  {
    x: 5,
    y: 33,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_6_1",
      name: "how even",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        ringnumber: `
        1...
        .4.4
        4.4.
        ...2
        `,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["circnum_5"],
    },
  }, // 5,33 panel circnum_6_1
  {
    x: 7,
    y: 33,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_6_2",
      name: "wait. is that a 3",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        ringnumber: `
        4.4.
        .4.4
        4.4.
        .4.3
        `,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["circnum_5"],
    },
  }, // 7,33 panel circnum_6_2
  {
    x: 5,
    y: 31,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_7_1",
      name: "how odd",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        ringnumber: `
        .3.1
        3.3.
        3.3.
        3.3.
        `,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["circnum_6_1"],
    },
  }, // 5,31 panel circnum_7_1
  {
    x: 7,
    y: 31,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_7_2",
      name: "6?",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        ringnumber: `
        2.2.
        .6..
        ....
        2.2.
        `,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["circnum_6_2"],
    },
  }, // 7,31 panel circnum_7_2
  {
    x: 6,
    y: 29,
    z: 1,
    type: "panel",
    panel: {
      id: "circnum_8",
      name: "finally",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      222
      212
      222`,
      symbols: {
        ringnumber: `
        ...
        .9.
        ...
        `,
      },
    },
    door: {
      rule: "correct",
      at_least: 1,
      panels: ["circnum_7_1", "circnum_7_2"],
    },
  }, // 6,29 panel circnum_8
  {
    x: 6,
    y: 26,
    z: 1,
    type: "portal",
    portal: {
      type: "warp",
      x: 9,
      y: 0,
      z: -99,
    },
  }, // 6,26 portal to z=-99
  // room: circle test
  {
    x: 66,
    y: 4,
    z: 1,
    type: "portal",
    portal: {
      x: 66,
      y: 4,
      z: 0,
    },
  }, // 66,4 portal to z=0
  {
    x: 66,
    y: 7,
    z: 1,
    type: "panel",
    panel: {
      id: "circle_test_0",
      name: "circle test: 0",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        ringnumber: `
        ...9
        .3..
        ....
        9..3
        `,
      },
    },
  }, // 66,7 panel circle_test_0
  {
    x: 65,
    y: 10,
    z: 1,
    type: "panel",
    panel: {
      id: "circle_test_1",
      name: "circle test: 1",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        ring: `
        ...0.
        ....0
        ..0..
        0....
        .0...`,
        ringnumber: `
        ....a
        .....
        .....
        .....
        a....
        `,
      },
    },
  }, // 65,10 panel circle_test_1
  {
    x: 67,
    y: 10,
    z: 1,
    type: "panel",
    panel: {
      id: "circle_test_2",
      name: "circle test: 2",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        circle: `
        0....
        .....
        ..0..
        ...0.
        ....0`,
        ringnumber: `
        ....c
        .4..2
        .....
        .....
        c....
        `,
      },
    },
  }, // 67,10 panel circle_test_2
  {
    x: 65,
    y: 12,
    z: 1,
    type: "panel",
    panel: {
      id: "circle_test_3",
      name: "circle test: 3",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        ring: `
        .....
        .....
        .....
        .....
        00000
        `,
        ringnumber: `
        66666
        .....
        66666
        .....
        .....
        `,
      },
    },
  }, // 65,12 panel circle_test_3
  {
    x: 67,
    y: 12,
    z: 1,
    type: "panel",
    panel: {
      id: "circle_test_4",
      name: "circle test: 4",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        ring: `
        .....
        .....
        .....
        .....
        .....`,
        circle: `
        .....
        .....
        .....
        .....
        .....`,
        ringnumber: `
        1...1
        .4...
        ..3..
        ...2.
        1...5`,
      },
    },
  }, // 67,12 panel circle_test_4
  {
    x: 66,
    y: 14,
    z: 1,
    type: "door",
    door: {
      id: "door_circle_test",
      rule: "correct",
      at_least: 2,
      countdown: true,
      panels: ["circle_test_1", "circle_test_2", "circle_test_3", "circle_test_4"],
    },
  }, // 66,14 door door_circle_test
  // room: triangles?
  {
    x: 63,
    y: 18,
    z: 1,
    type: "panel",
    panel: {
      id: "ruing_0_1",
      name: "",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      222
      222
      222`,
      ruin: "00\n0.",
      symbols: {
        ruing: `
        ...
        .0.
        ...`,
      },
    },
  }, // 63,18 panel ruing_0_1
  {
    x: 66,
    y: 18,
    z: 1,
    type: "panel",
    panel: {
      id: "ruing_0_2",
      name: "",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      222
      222
      222`,
      ruin: "00\n00",
      symbols: {
        ruing: `
        ...
        .0.
        ...`,
      },
    },
  }, // 66,18 panel ruing_0_2
  {
    x: 69,
    y: 18,
    z: 1,
    type: "panel",
    panel: {
      id: "ruing_0_3",
      name: "",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      222
      222
      222`,
      ruin: "0",
      symbols: {
        ruing: `
        000
        0.0
        000`,
      },
    },
  }, // 69,18 panel ruing_0_3
  {
    x: 66,
    y: 20,
    z: 1,
    type: "door",
    door: {
      id: "door_ruing_0",
      rule: "solved",
      at_least: 3,
      countdown: true,
      panels: ["ruing_0_1", "ruing_0_2", "ruing_0_3"],
    },
  }, // 66,20 door door_ruing_0
  {
    x: 66,
    y: 22,
    z: 1,
    type: "panel",
    panel: {
      id: "ruing_1_1",
      name: "",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      ruin: "00.\n.00",
      symbols: {
        ruing: `
        00...
        ...0.
        .....
        .0...
        ...0.`,
      },
    },
  }, // 66,22 panel ruing_1_1
  {
    x: 66,
    y: 24,
    z: 1,
    type: "panel",
    panel: {
      id: "ruing_1_2",
      name: "",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      ruin: "000",
      symbols: {
        ruing: `
        ..0..
        ....0
        .....
        ..0..
        0....`,
        circle: `
        4....
        .....
        .....
        .....
        ....4`,
      },
    },
  }, // 66,24 panel ruing_1_2
  {
    x: 67,
    y: 26,
    z: 1,
    type: "panel",
    panel: {
      id: "ruing_1_3",
      name: "",
      w: 6,
      h: 6,
      type: "binary",
      map: `
      022220
      222222
      222222
      222222
      222222
      022220`,
      ruin: "00.0.\n.0000",
      symbols: {
        ruing: `
        ......
        .....0
        ......
        ...0..
        ......
        ......`,
        ring: `
        ......
        0.....
        ......
        ....0.
        0.....
        ......`,
      },
    },
  }, // 67,26 panel ruing_1_3
  {
    x: 70,
    y: 21,
    z: 1,
    type: "panel",
    panel: {
      id: "ruing_1_4",
      name: "",
      w: 6,
      h: 6,
      type: "binary",
      map: `
      222222
      222222
      222222
      222222
      222222
      222222`,
      ruin: ".0.\n000\n.0.",
      symbols: {
        ruing: `
        ......
        .0..0.
        ......
        ......
        .0..0.
        ......`,
      },
    },
  }, // 70,21 panel ruing_1_4
  {
    x: 71,
    y: 25,
    z: 1,
    type: "door",
    door: {
      id: "door_ruing_1",
      rule: "solved",
      at_least: 3,
      countdown: true,
      panels: ["ruing_1_1", "ruing_1_2", "ruing_1_3", "ruing_1_4"],
    },
  }, // 71,25 door door_ruing_1
  {
    x: 76,
    y: 22,
    z: 1,
    type: "panel",
    panel: {
      id: "ruing_2_1",
      name: "",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      222
      222
      222`,
      ruin: "00\n.0",
      symbols: {
        ruing: `
        ...
        .1.
        ...`,
      },
    },
  }, // 76,22 panel ruing_2_1
  {
    x: 77,
    y: 26,
    z: 1,
    type: "panel",
    panel: {
      id: "ruing_2_2",
      name: "",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      ruin: "00.\n.00",
      symbols: {
        ruing: `
        1....
        ..1..
        ....1
        .1.1.
        .....`,
      },
    },
  }, // 77,26 panel ruing_2_2
  {
    x: 79,
    y: 23,
    z: 1,
    type: "panel",
    panel: {
      id: "ruing_2_3",
      name: "",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      ruin: ".0.\n000",
      symbols: {
        ruing: `
        1111
        1111
        1111
        1111`,
      },
    },
  }, // 79,23 panel ruing_2_3
  {
    x: 80,
    y: 20,
    z: 1,
    type: "door",
    door: {
      id: "door_ruing_2",
      rule: "solved",
      at_least: 2,
      countdown: true,
      panels: ["ruing_2_1", "ruing_2_2", "ruing_2_3"],
    },
  }, // 80,20 door door_ruing_2
  {
    x: 72,
    y: 19,
    z: 1,
    type: "panel",
    panel: {
      id: "ruing_3_1",
      name: "",
      w: 6,
      h: 6,
      type: "binary",
      map: `
      222222
      222222
      222222
      222222
      222222
      222222`,
      ruin: ".0.\n000\n.0.",
      symbols: {
        ruing: `
        ......
        .1..1.
        ..11..
        ..11..
        .1..1.
        ......`,
      },
    },
  }, // 72,19 panel ruing_3_1
  {
    x: 77,
    y: 19,
    z: 1,
    type: "panel",
    panel: {
      id: "ruing_3_2",
      name: "",
      w: 7,
      h: 7,
      type: "binary",
      map: `
      2222222
      2222222
      2222222
      2222222
      2222222
      2222222
      2222222`,
      ruin: "...0...\n0000000",
      symbols: {
        ruing: `
        .......
        ...1...
        ...1...
        .111111
        ...1...
        ...1..1
        ...1...`,
      },
    },
  }, // 77,19 panel ruing_3_2
  {
    x: 80,
    y: 18,
    z: 1,
    type: "panel",
    panel: {
      id: "ruing_3_3",
      name: "",
      w: 7,
      h: 7,
      type: "binary",
      map: `
      2222222
      2222222
      2222222
      2222222
      2222222
      2222222
      2222222`,
      ruin: ".0\n00\n.0",
      symbols: {
        ruing: `
        1..1..1
        .1.1.1.
        ..111..
        1111111
        ..111..
        .1.1.1.
        ...1...`,
      },
    },
  }, // 80,18 panel ruing_3_3
  {
    x: 80,
    y: 15,
    z: 1,
    type: "panel",
    panel: {
      id: "ruing_3_4",
      name: "",
      w: 8,
      h: 8,
      type: "binary",
      map: `
      22222222
      22222222
      22222222
      22222222
      22222222
      22222222
      22222222
      22222222`,
      ruin: "0000\n...0\n...0\n...0",
      symbols: {
        ruing: `
        1......1
        ........
        ........
        ........
        ........
        ........
        ........
        1......1
        `,
        circle: `
        .....2..
        ........
        ........
        ........
        ........
        ........
        ........
        .....2..
        `,
      },
    },
  }, // 80,15 panel ruing_3_4
  {
    x: 75,
    y: 17,
    z: 1,
    type: "panel",
    panel: {
      id: "ruing_3_5",
      name: "",
      w: 6,
      h: 6,
      type: "binary",
      map: `
      222222
      222222
      222222
      222222
      222222
      222222`,
      ruin: ".00\n000\n00.",
      symbols: {
        ruing: `
        1....1
        .1..1.
        ..11..
        ..11..
        .1..1.
        1....1
        `,
      },
    },
  }, // 75,17 panel ruing_3_5
  {
    x: 71,
    y: 15,
    z: 1,
    type: "door",
    door: {
      id: "door_ruing_3",
      rule: "solved",
      at_least: 3,
      countdown: true,
      panels: ["ruing_3_1", "ruing_3_2", "ruing_3_3", "ruing_3_4", "ruing_3_5"],
    },
  }, // 71,15 door door_ruing_3
  {
    x: 71,
    y: 14,
    z: 1,
    type: "panel",
    panel: {
      id: "ruing_4_star",
      name: "why is this so huge",
      w: 14,
      h: 14,
      type: "binary",
      map: `
      22222222222222
      22222222222222
      22222222222222
      22222222222222
      22222222222222
      22222222222222
      22222222222222
      22222222222222
      22222222222222
      22222222222222
      22222222222222
      22222222222222
      22222222222222
      22222222222222`,
      ruin: `
      000......
      000......
      .00......
      .00......
      .00......
      000......
      000......
      000......
      ..0......
      ..0......
      ..0......
      ..0000...
      ..0..0...
      0000.0000
      `,
      symbols: {
        ruing: `
        1............1
        ..............
        ..............
        ..............
        ..............
        ..............
        ..............
        ..............
        1.............
        ..............
        ..............
        ..............
        ..............
        1............1
        `,
      },
    },
  }, // 71,14 panel ruing_4_star
  {
    x: 70,
    y: 13,
    z: 1,
    type: "star",
    star: {
      id: "ruing_1",
    },
  }, // 70,13 star ruing_1
  // room: room
  {
    x: 27,
    y: 11,
    z: 1,
    type: "portal",
    portal: {
      x: 23,
      y: 11,
      z: 0,
    },
  }, // 27,11 portal to z=0
  
  // room: ringed rings
  {
    x: 28,
    y: 15,
    z: 1,
    type: "portal",
    portal: {
      flip: true,
      x: 28,
      y: 15,
      z: 0,
    },
  }, // 28,15 portal to z=0
  {
    x: 31,
    y: 15,
    z: 1,
    type: "panel",
    panel: {
      id: "donut_0",
      name: "donut shaped?",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      122
      222
      222`,
      symbols: {
        donut: `
        ...
        .0.
        ...`,
      },
    },
  }, // 31,15 panel donut_0
  {
    x: 33,
    y: 14,
    z: 1,
    type: "panel",
    panel: {
      id: "donut_1_1",
      name: "donut 1",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      222
      222
      222`,
      symbols: {
        donut: `
        ...
        .0.
        ...`,
        circle: `
        2..
        0.2
        ..0`,
      },
    },
  }, // 33,14 panel donut_1_1
  {
    x: 34,
    y: 14,
    z: 1,
    type: "panel",
    panel: {
      id: "donut_1_2",
      name: "donut 2",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      222
      222
      222`,
      symbols: {
        donut: `
        0.0
        ...
        0.0`,
        ringnumber: `
        ...
        .5.
        ...`,
        ring: `
        ...
        0.0
        ...`,
      },
    },
  }, // 34,14 panel donut_1_2
  {
    x: 35,
    y: 14,
    z: 1,
    type: "panel",
    panel: {
      id: "donut_1_3",
      name: "donut 3",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        donut: `
        0...0
        .0.0.
        .....
        .0.0.
        0...0`,
        ringnumber: `
        .....
        .....
        ..e..
        .....
        .....`,
        ring: `
        .....
        ..0..
        .0.0.
        .....
        .....`,
      },
    },
  }, // 35,14 panel donut_1_3
  {
    x: 33,
    y: 15,
    z: 1,
    type: "panel",
    panel: {
      id: "donut_1_4",
      name: "donut 4",
      w: 3,
      h: 3,
      type: "binary",
      map: `
      122
      220
      012`,
      symbols: {
        donut: `
        000
        000
        000`,
      },
    },
  }, // 33,15 panel donut_1_4
  {
    x: 35,
    y: 15,
    z: 1,
    type: "panel",
    panel: {
      id: "donut_1_5",
      name: "donut 5",
      w: 6,
      h: 6,
      type: "binary",
      map: `
      022222
      122222
      022222
      122222
      022222
      122222`,
      symbols: {
        donut: `
        0.0...
        0.0...
        0.0...
        0.0...
        0.0...
        .00...`,
        circle: `
        .....1
        ......
        ......
        ......
        ......
        1.....`,
        ring: `
        .0....
        .0....
        .0....
        .0....
        .0....
        ......`,
      },
    },
  }, // 35,15 panel donut_1_5
  {
    x: 33,
    y: 16,
    z: 1,
    type: "panel",
    panel: {
      id: "donut_1_6",
      name: "donut 6",
      w: 4,
      h: 4,
      type: "binary",
      map: `
      2222
      2222
      2222
      2222`,
      symbols: {
        donut: `
        .00.
        0..0
        0..0
        .00.`,
        ring: `
        0..0
        .00.
        .00.
        0..0`,
      },
    },
  }, // 33,16 panel donut_1_6
  {
    x: 34,
    y: 16,
    z: 1,
    type: "panel",
    panel: {
      id: "donut_1_7",
      name: "donut 7",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        donut: `
        .0.0.
        0...0
        ..0..
        0...0
        .0.0.`,
        number: `
        ..3..
        .333.
        33.33
        .333.
        ..3..`,
        circle: `
        0...0
        .....
        .....
        .....
        0...0`,
      },
    },
  }, // 34,16 panel donut_1_7
  {
    x: 35,
    y: 16,
    z: 1,
    type: "panel",
    panel: {
      id: "donut_1_8",
      name: "donut 8",
      w: 5,
      h: 5,
      type: "binary",
      map: `
      22222
      22222
      22222
      22222
      22222`,
      symbols: {
        donut: `
        .0.0.
        0.0.0
        .0.0.
        0.0.0
        .0.0.`,
        ringnumber: `
        7...6
        .....
        .....
        .....
        ..4..`,
      },
    },
  }, // 35,16 panel donut_1_8
  {
    x: 34,
    y: 12,
    z: 1,
    type: "door",
    door: {
      id: "door_donut_1",
      rule: "solved",
      at_least: 5,
      countdown: true,
      panels: ["donut_1_1", "donut_1_2", "donut_1_3", "donut_1_4", "donut_1_5", "donut_1_6", "donut_1_7", "donut_1_8"],
    },
  }, // 34,12 door door_donut_1
  
  
  // @ z = -99
  
  {
    x: 0,
    y: 0,
    z: -99,
    type: "portal",
    portal: {
      x: 27,
      y: 11,
      z: -1,
    },
  }, // 0,0 portal to z=-1
  {
    x: 9,
    y: -4,
    z: -99,
    type: "portal",
    portal: {
      type: "warp",
      x: 69,
      y: -8,
      z: -1,
    },
  }, // 9,-4 portal to z=-1
  {
    x: 7,
    y: -4,
    z: -99,
    type: "panel",
    panel: {
      id: "warp_1",
      name: "",
      w: 1,
      h: 1,
      type: "binary",
      map: "2",
      answer: "1",
    },
  }, // 7,-4 panel warp_1
  {
    x: 5,
    y: -4,
    z: -99,
    type: "door",
    door: {
      id: "door_warp_1",
      rule: "solved",
      at_least: 1,
      panels: ["warp_1"],
    },
  }, // 5,-4 door door_warp_1
  {
    x: 5,
    y: -3,
    z: -99,
    type: "sign",
    physics: "empty",
    sign: "text",
    title: "warp 1",
    content: "amazing",
    fontsize: 0.12,
    fontcolor: "#eee",
  }, // 5,-3 sign for warp 1
  {
    x: 9,
    y: 0,
    z: -99,
    type: "portal",
    portal: {
      type: "warp",
      x: 6,
      y: 26,
      z: 1,
    },
  }, // 9,0 portal to z=1
  {
    x: 7,
    y: 0,
    z: -99,
    type: "panel",
    panel: {
      id: "warp_2",
      name: "",
      w: 1,
      h: 1,
      type: "binary",
      map: "2",
      answer: "1",
    },
  }, // 7,0 panel warp_2
  {
    x: 5,
    y: 0,
    z: -99,
    type: "door",
    door: {
      id: "door_warp_2",
      rule: "solved",
      at_least: 1,
      panels: ["warp_2"],
    },
  }, // 5,0 door door_warp_2
  {
    x: 5,
    y: 1,
    z: -99,
    type: "sign",
    physics: "empty",
    sign: "text",
    title: "warp 2",
    content: "circled numbers",
    fontsize: 0.12,
    fontcolor: "#eee",
  }, // 5,1 sign for warp 2
  {
    x: 7,
    y: 4,
    z: -99,
    type: "panel",
    panel: {
      id: "warp_3",
      name: "",
      w: 1,
      h: 1,
      type: "binary",
      map: "2",
      answer: "1",
      unsolvable: true,
    },
  }, // 7,4 panel warp_3
  {
    x: 5,
    y: 4,
    z: -99,
    type: "door",
    door: {
      id: "door_warp_3",
      rule: "solved",
      at_least: 1,
      panels: ["warp_3"],
    },
  }, // 5,4 door door_warp_3
  {
    x: 4,
    y: 7,
    z: -99,
    type: "panel",
    panel: {
      id: "warp_4",
      name: "",
      w: 1,
      h: 1,
      type: "binary",
      map: "2",
      answer: "1",
      unsolvable: true,
    },
  }, // 4,7 panel warp_4
  {
    x: 4,
    y: 5,
    z: -99,
    type: "door",
    door: {
      id: "door_warp_4",
      rule: "solved",
      at_least: 1,
      panels: ["warp_4"],
    },
  }, // 4,5 door door_warp_4
  {
    x: 0,
    y: 7,
    z: -99,
    type: "panel",
    panel: {
      id: "warp_5",
      name: "",
      w: 1,
      h: 1,
      type: "binary",
      map: "2",
      answer: "1",
      unsolvable: true,
    },
  }, // 0,7 panel warp_5
  {
    x: 0,
    y: 5,
    z: -99,
    type: "door",
    door: {
      id: "door_warp_5",
      rule: "solved",
      at_least: 1,
      panels: ["warp_5"],
    },
  }, // 0,5 door door_warp_5
  {
    x: -4,
    y: 7,
    z: -99,
    type: "panel",
    panel: {
      id: "warp_6",
      name: "",
      w: 1,
      h: 1,
      type: "binary",
      map: "2",
      answer: "1",
      unsolvable: true,
    },
  }, // -4,7 panel warp_6
  {
    x: -4,
    y: 5,
    z: -99,
    type: "door",
    door: {
      id: "door_warp_6",
      rule: "solved",
      at_least: 1,
      panels: ["warp_6"],
    },
  }, // -4,5 door door_warp_6
  
  
  
  
];


export const wires_def = [
  
  {
    x: 8,
    y: 0,
    z: -1,
    map: `0000`,
    rules: [["0_smile"]],
  }, // 8,0,-1 room: first puzzle
  {
    x: 15,
    y: -2,
    z: -1,
    map: `
    ..1..
    ..1..
    00+33
    ..2..
    ..2..`,
    rules: [["0_1"], ["0_2"], ["0_3"], ["0_4"]],
  }, // 15,-2,-1 room: taunt
  {
    x: 29,
    y: -5,
    z: 0,
    map: `
...+.....1
...1...44+
.....2+4.7
.00+22...77
10...2....7
+00..+5555+
..0..3...88
.1+333..88
.1...3.1+.
.....+666.
    `,
    rules: [["scattered_0"], [""], ["scattered_1"], ["scattered_2"], ["scattered_3"], ["scattered_4"], ["scattered_5"], ["scattered_6"], ["scattered_7"]],
  }, // 29,-5,0 room: scattered
  {
    x: 43,
    y: 4,
    z: 0,
    map: `
    ..1..
    ..1..
    00+22
    ..3..
    ..3..`,
    rules: [["corridor_1"], ["corridor_2"], ["corridor_3"], ["corridor_4"]],
  }, // 43,4,0 room: 50%
  {
    x: 41,
    y: 4,
    z: -1,
    map: `
    ..+3+1+
    ..5...0
    +7+...+
    ..6...0
    ..+4+2+`,
    rules: [["diagonal_0"], ["diagonal_1"], ["diagonal_2"], ["diagonal_3"], ["diagonal_4"], ["diagonal_5"], ["diagonal_6"], ["diagonal_last"]],
  }, // 41,4,-1 room: diagonal
  {
    x: 43,
    y: -11,
    z: 0,
    map: `
    ....+..
    .......
    .......
    .......
    ...22+.
    ..+1.2.
    ...122.
    ..11...
    .........+
    .......+55
    `,
    rules: [[""], ["ruins_water"], ["ruins_wall"], ["ruins_scattered"], ["ruins_wire"], ["ruins_maze"]],
    properties: [{}, { invisible: true, }, { invisible: true, }, {}, {}],
  }, // 43,-11,0 room: the ruins
  {
    x: 24,
    y: 2,
    z: -1,
    map: `
    0+
    +11
    0+`,
    rules: [["basement_unlock"]],
  }, // 24,2,-1 room: basement
  {
    x: 52,
    y: 0,
    z: -1,
    map: `
    +
    0
    +`,
    rules: [["choice_0"]],
  }, // 52,0,-1 room: a choice
  {
    x: 58,
    y: 4,
    z: 0,
    map: `
    +
    0
    +
    .
    +1+.+2+`,
    rules: [["trial_overview"], ["trial_overview_2"], ["trial_overview_3"]],
  }, // 58,4,0 room: overview (trial)
  {
    x: 67,
    y: 1,
    z: 0,
    map: `
    ..+
    .+0
    +0
    ..
    ..
    .+
    .1
    .+`,
    rules: [["trial_shortcut_2"], ["trial_shortcut_star"]],
  }, // 67,1,0 room: overview (link)
  {
    x: 17,
    y: 3,
    z: 0,
    map: `
    +
    0
    +
    1
    +`,
    rules: [["ring_0"], ["ring_1"]],
  }, // 17,3,0 room: westward
  {
    x: 14,
    y: 9,
    z: 0,
    map: `
    .00+00.
    1+...+2
    1.....2
    +.....+
    3.....4
    3+...+4
    .55+66.
    ...7...
    ...+...
    `,
    rules: [["ring_2"], ["ring_3"], ["ring_4"], ["ring_5"], ["ring_6"], ["ring_7"], ["ring_8"], ["ring_last"]],
  }, // 14,9,0 room: a ring
  {
    x: 3,
    y: 19,
    z: 1,
    map: `
    ..66+4+.1+0.
    +8+...33+.+.
    ..77+5+.2+0.
    `,
    rules: [["circle_1"], ["circle_2_1"], ["circle_2_2"], ["circle_3"], ["circle_4_1"], ["circle_4_2"], ["circle_5_1"], ["circle_5_2"], ["circle_last"]],
  }, // 3,19,1 room: circles
  {
    x: 3,
    y: 24,
    z: 1,
    map: `
........+
........+
........+0+
........+
........+
..6+7..+1
..6.7....
..+.+....
..4.5....
..+.+.2++
..3+3.2..
......+..
    `,
    rules: [["circnum_1"], ["door_circnum_2"], ["door_circnum_4"], ["circnum_5"], ["circnum_6_1"], ["circnum_6_2"], ["circnum_7_1"], ["circnum_7_2"]],
  }, // 8,24,1 room: circled numbers
  {
    x: 61,
    y: -1,
    z: -1,
    map: `
    ...+
    0+11
    0+`,
    rules: [["amazing_link"], ["amazing_1"]],
  }, // 61,-1,-1 room: amazing link
  
];



for (const o of objects_temp) {
  o.seen = false;
  if (o.panel) {
    if (o.panel.map) o.panel.map = o.panel.map.trim().replaceAll(/[ ]/g, "").split("\n");
    if (o.panel.answer) o.panel.answer = o.panel.answer.trim().replaceAll(/[ ]/g, "").split("\n");
    if (o.panel.ruin) o.panel.ruin = o.panel.ruin.trim().replaceAll(/[ ]/g, "").split("\n");
    for (const s in o.panel.symbols ?? []) {
      o.panel.symbols[s] = o.panel.symbols[s].trim().replaceAll(/[ ]/g, "").split("\n");
    }
    o.panel.state = [];
    for (let y = 0; y < o.panel.h; y++) {
      const temp = [];
      for (let x = 0; x < o.panel.w; x++) {
        if (+o.panel.map[y][x] != 2) {
          temp.push(+o.panel.map[y][x]);
        } else {
          temp.push(o.panel.initial && o.panel.initial[y] ? +o.panel.initial[y][x] : 0);
        }
      }
      o.panel.state.push(temp);
    }
    o.panel.lock = [];
    for (let y = 0; y < o.panel.h; y++) {
      const temp = [];
      for (let x = 0; x < o.panel.w; x++) {
        temp.push(0);
      }
      o.panel.lock.push(temp);
    }
  }
}


export const wires_temp = (function() {
  const wires = {}; // result
  
  const vec2str = function(x, y, z) {
    return x + "," + y + "," + z;
  };
  
  for (const w of wires_def) {
    if (w.map) w.map = w.map.trim().replaceAll(/[ ]/g, "").split("\n");
    
    const wirelookup = {};
    for (let dy = 0; dy < w.map.length; dy++) {
      for (let dx = 0; dx < w.map[dy].length; dx++) {
        const s = w.map[dy][dx];
        if (s === ".") continue;
        const str = vec2str(w.x + dx, w.y + dy, w.z);
        const o = {
          x: w.x + dx,
          y: w.y + dy,
          z: w.z,
          num: (s === "+") ? 99 : parseInt(s, 36),
        };
        o.rule = w.rules[o.num];
        if (w.properties && w.properties[o.num]) {
          const props = w.properties[o.num];
          for (const k in props) {
            o[k] = props[k];
          }
        }
        wirelookup[str] = o;
      }
    }
    const dir4 = [[1, 0], [0, 1], [-1, 0], [0, -1]];
    for (const ws in wirelookup) {
      const wow = wirelookup[ws];
      const { x, y, z, num } = wow;
      const dirs = [];
      let d = 0;
      for (const [dx, dy] of dir4) {
        d++;
        const s = vec2str(x + dx, y + dy, z);
        if (wirelookup.hasOwnProperty(s)) {
          const o = wirelookup[s];
          if (num === o.num || o.num === 99) {
            dirs.push(d);
          }
        }
      }
      wow.dirs = dirs;
      wires[ws] = wow;
      // console.log(ws, wow);
    }
  }
  
  return wires;
})(); // :)