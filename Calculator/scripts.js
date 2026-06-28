const screen = document.getElementById("screen");
const buttons = document.querySelectorAll("button");
const historyDiv = document.getElementById("history");

let expr = "";
let resultShown = false;

/* HISTORY TOGGLE */
document.getElementById("toggleHistory").onclick = () => {
  historyDiv.classList.toggle("show");
};

/* CLEAN */
function clean(e) {
  return (e || "")
    .replace(/\s/g, "")
    .replace(/π/g, "Math.PI");
}

/* CALCULATE */
function calculate(e) {
  try {
    e = clean(e);
    if (!e) return "Error";

    return Function(`
      const sin = x => Math.sin(x*Math.PI/180);
      const cos = x => Math.cos(x*Math.PI/180);
      const tan = x => Math.tan(x*Math.PI/180);
      return ${e};
    `)();
  } catch {
    return "Error";
  }
}

/* HISTORY */
function addHistory(e, r) {
  if (r === "Error") return;

  const div = document.createElement("div");
  div.innerText = `${e} = ${r}`;

  div.onclick = () => {
    expr = r.toString();
    render();
  };

  historyDiv.prepend(div);
}

/* RENDER */
function render() {
  screen.value = expr || "0";
}

/* BUTTON HANDLER */
buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    let v = btn.getAttribute("data");

    /* CLEAR */
    if (btn.id === "clear") {
      expr = "";
      resultShown = false;
      render();
      return;
    }

    /* DELETE */
    if (btn.id === "del") {
      expr = expr.slice(0, -1);
      render();
      return;
    }

    /* EQUAL */
    if (btn.id === "eq") {
      const result = calculate(expr);

      addHistory(expr, result);

      expr = result.toString();
      resultShown = true;

      render();
      return;
    }

    /* INPUT HANDLING (🔥 FIX IS HERE) */
    if (v) {
      if (resultShown) {
        expr = "";        // 🔥 CLEAR OLD RESULT
        resultShown = false;
      }

      expr += v;
    }

    render();
  });
});

/* KEYBOARD */
document.addEventListener("keydown", e => {

  /* PREVENT BROWSER DEFAULT BEHAVIOR */
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("eq").click();
    return;
  }

  if (e.key === "Backspace") {
    expr = expr.slice(0, -1);
    render();
    return;
  }

  if (e.key === "Escape") {
    expr = "";
    resultShown = false;
    render();
    return;
  }

  if ("0123456789+-*/().".includes(e.key)) {

    if (resultShown) {
      expr = "";
      resultShown = false;
    }

    expr += e.key;
    render();
  }
});