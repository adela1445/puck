// TODO LOOK INTO ADDING IN SPRITES AND OR HOW TO STYLE THE OBJECTS TO APPEAR AS GHOSTS AND PAcman

let currentScore = 0;
document.querySelector("#score").innerHTML = " :" + currentScore;
setInterval(function level() {
  currentScore++;
  document.querySelector("#score").innerHTML = " :" + currentScore;
}, 100);

let currentLevel = 1;
document.querySelector("#level").innerHTML = " :" + currentLevel;
setInterval(function level() {
  currentLevel++;
  document.querySelector("#level").innerHTML = " :" + currentLevel;
}, 10000);

let startTime = Date.now();

setInterval(function() {
  let elapsedTime = Date.now() - startTime;
  document.querySelector("#timer").innerHTML =
    " :" + (elapsedTime / 1000).toFixed(1);
}, 100);

const backgroundMusic = document.querySelector("#bgm");
const crashSound = document.querySelector("#ohNo");

planck.testbed("Puckman", function(testbed) {
  const pl = planck,
    Vec2 = pl.Vec2;

  const PUCK = 2;
  const GHOST = 4;

  const SPACE_WIDTH = 16;
  const SPACE_HEIGHT = 9;

  testbed.width = SPACE_WIDTH;
  testbed.height = SPACE_HEIGHT;
  testbed.step = tick;
  testbed.ratio = 64;
  testbed.y = 0;

  const ghostRadius = 0.45;
  const ghostSpeed = 3;
  const ghostLevels = 4;

  let lives;
  let gameOver;
  let level;

  let allowCrashTime = 0;

  const world = pl.World();

  let ghostBodies = [];
  let puckman;

  testbed.keydown = function(code, char) {
    if (testbed.activeKeys.fire) {
      gameOver && start();
    }
  };

  world.on("pre-solve", function(contact) {
    // let fixtureA = contact.getFixtureA();
    // let fixtureB = contact.getFixtureB();

    let bodyA = contact.getFixtureA().getBody();
    let bodyB = contact.getFixtureB().getBody();

    let apuck = bodyA === puckman;

    let bpuck = bodyB === puckman;

    if ((apuck || bpuck) && allowCrashTime < globalTime) {
      // Puck collided with something
      let puck = apuck ? bodyA : bodyB;
      let ghost = !apuck ? bodyA : bodyB;

      setTimeout(function() {
        crash(puck, ghost);
      }, 1);
    }
  });

  function increaseGhosts() {
    setInterval(function() {
      console.log("Added a ghost");
      level++;
      console.log(level);
      addGhosts();
    }, 10000);
  }

  function reduceLives() {
    if (lives == 3) {
      document.querySelector("#lives").innerHTML = " X " + 3;
    } else if (lives == 2) {
      document.querySelector("#lives").innerHTML = " X " + 2;
    } else {
      document.querySelector("#lives").innerHTML = " X " + 1;
    }
  }

  function start() {
    backgroundMusic.play();

    gameOver = false;
    level = 1;
    lives = 3;
    reduceLives();
    uiStatus();
    setupPuckman(true);
    addGhosts();
    uiStart();
    increaseGhosts();
  }

  function end() {
    gameOver = true;
    uiEnd();
  }

  function setupPuckman() {
    puckman = world.createBody({
      type: "dynamic",
      angularDamping: 2.0,
      linearDamping: 0.5,
      position: Vec2(),
    });

    puckman.createFixture(pl.Circle([Vec2(0, 0.2)]), {
      density: 2,
      filterCategoryBits: PUCK,
      filterMaskBits: GHOST,
    });
    allowCrashTime = globalTime + 2000;
  }

  let globalTime = 0;

  function tick(dt) {
    globalTime += dt;

    if (puckman) {
      if (testbed.activeKeys.up) {
        console.log("UP!");
        let f = puckman.getWorldVector(Vec2(0.0, 1.0));
        let p = puckman.getWorldPoint(Vec2(0.0, 1.0));
        puckman.applyLinearImpulse(f, p, true);
      }

      if (testbed.activeKeys.down) {
        console.log("DOWN!");
        let f = puckman.getWorldVector(Vec2(0.0, -1.0));
        let p = puckman.getWorldPoint(Vec2(0.0, -1.0));
        puckman.applyLinearImpulse(f, p, true);
      }

      if (testbed.activeKeys.left) {
        console.log("LEFT!");
        let f = puckman.getWorldVector(Vec2(-1.0, 0.0));
        let p = puckman.getWorldPoint(Vec2(-1.0, 0.0));
        puckman.applyLinearImpulse(f, p, true);
      }

      if (testbed.activeKeys.right) {
        console.log("RIGHT!");
        let f = puckman.getWorldVector(Vec2(1.0, 0.0));
        let p = puckman.getWorldPoint(Vec2(1.0, 0.0));
        puckman.applyLinearImpulse(f, p, true);
      }

      wrap(puckman);
    }

    for (let i = 0; i !== ghostBodies.length; i++) {
      let ghostBody = ghostBodies[i];
      wrap(ghostBody);
    }
  }

  // Add some ghosts to the scene
  function addGhosts() {
    // while (ghostBodies.length) {
    //   let ghostBody = ghostBodies.shift();
    //   // world.destroyBody(ghostBody);
    // }

    for (let i = 0; i < level; i++) {
      let puckmanPosition = puckman.getPosition();
      let x = puckmanPosition.x;
      let y = puckmanPosition.y;

      // Avoid the puck!
      while (
        Math.abs(x - puckmanPosition.x) < ghostRadius * 2 &&
        Math.abs(y - puckmanPosition.y) < ghostRadius * 2
      ) {
        x = rand(SPACE_WIDTH);
        y = rand(SPACE_HEIGHT);
      }

      let vx = rand(ghostSpeed);
      let vy = rand(ghostSpeed);
      let va = rand(ghostSpeed);

      // Create ghost body
      let ghostBody = makeGhostBody(x, y, vx, vy, va, 0);
      ghostBody.level = 1;
    }
  }

  function ghostLevelRadius(level) {
    return (ghostRadius * (ghostLevels - level)) / ghostLevels;
  }

  function makeGhostBody(x, y, vx, vy, va, level) {
    let ghostBody = world.createKinematicBody({
      mass: 100,
      position: Vec2(x, y),
      linearVelocity: Vec2(vx, vy),
      angularVelocity: va,
    });
    ghostBodies.push(ghostBody);

    let radius = ghostLevelRadius(level);

    const n = 8,
      path = [];
    for (let i = 0; i < n; i++) {
      let a = (i * 2 * Math.PI) / n;
      let x = radius * (Math.sin(a) + rand(0.3));
      let y = radius * (Math.cos(a) + rand(0.3));
      path.push(Vec2(x, y));
    }

    ghostBody.createFixture(pl.Polygon(path), {
      filterCategoryBits: GHOST,
      filterMaskBits: PUCK,
    });

    return ghostBody;
  }

  function crash(puck, ghost) {
    if (!puckman) return;
    crashSound.play();
    lives--;
    reduceLives();
    uiStatus();

    // Remove Puckman for awhile
    world.destroyBody(puckman);
    puckman = null;

    if (lives <= 0) {
      end();
      return;
    }
    setTimeout(function() {
      // Add Puckman again
      setupPuckman();
    }, 1000);
  }

  // If the body is out of space bounds, wrap it to the other side
  function wrap(body) {
    var p = body.getPosition();
    p.x = wrapNumber(p.x, -SPACE_WIDTH / 2, SPACE_WIDTH / 2);
    p.y = wrapNumber(p.y, -SPACE_HEIGHT / 2, SPACE_HEIGHT / 2);
    body.setPosition(p);
  }

  function wrapNumber(num, min, max) {
    if (typeof min === "undefined") {
      (max = 1), (min = 0);
    } else if (typeof max === "undefined") {
      (max = min), (min = 0);
    }
    if (max > min) {
      num = (num - min) % (max - min);
      return num + (num < 0 ? max : min);
    } else {
      num = (num - max) % (min - max);
      return num + (num <= 0 ? min : max);
    }
  }

  // Returns a random number between -0.5 and 0.5
  function rand(value) {
    return (Math.random() - 0.5) * (value || 1);
  }

  function uiStart() {
    console.log("Game started");
  }

  function renderScores(user_id, score, level) {
    console.log("in render scores")
    $.post("/api/save", {
      user_id: user_id,
      score: score,
      level: level,
    }).then(function (data) {
      console.log("data",data)
      window.location = ("/score");
    });
  }

  function uiEnd() {
    localStorage.setItem("currentScore", currentScore);
    localStorage.setItem("currentLevel", currentLevel);
    $.get("/api/user_data", function (data) {
      localStorage.setItem("name", data.id);

      console.log(data.id);
      console.log(currentScore);
      console.log(currentLevel);
      renderScores(data.id, currentScore, currentLevel);
    });
    console.log("Game over");
    testbed.status("Game Over!");
  }

  function uiStatus() {
    console.log("Level: " + level + " Lives: " + lives);
    testbed.status("Level", level);
    testbed.status("Lives", lives);
  }

  start();

  return world;
});
