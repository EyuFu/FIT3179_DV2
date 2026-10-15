// Embed every Vega-Lite chart. One idiom per .vg.json file in this folder.
const charts = ["01_isotype", "02_heatmap", "03_bump", "04_slope", "05_small_multiples", "06_choropleth", "07_dumbbell", "08_dotmap", "09_propsymbol", "10_parallel", "11_waffle", "12_polar"];
const opts = { renderer: "svg" };  // default vega-embed options, as in the Week 7 tutorial: the "..." menu (save as SVG/PNG, view source, open in Vega Editor) stays on
// Wait for the web fonts first, so Vega measures label widths with the real typeface.
const views = {};
document.fonts.ready.then(() => {
  const loading = charts.map(name =>
    vegaEmbed("#vis-" + name, "js/" + name + ".vg.json", opts)
      .then(result => { views[name] = result.view; })
      .catch(err => {
        document.querySelector("#vis-" + name).textContent = "This chart could not be loaded.";
        console.error(name, err);
      }));
  Promise.all(loading).then(linkMapAndDumbbell);
});

// Linked view: chart 6 (choropleth) and chart 7 (dumbbell) always show the same state.
function linkMapAndDumbbell() {
  const map = views["06_choropleth"], dumbbell = views["07_dumbbell"];
  if (!map || !dumbbell) return;
  // 1. Click a state on the map -> chart 7 shows that state (its menu updates too).
  map.addSignalListener("pick", (name, value) => {
    if (value && value.state_name) dumbbell.signal("area_pick", value.state_name[0]).runAsync();
  });
  // 2. Choose a state in chart 7's menu (or click the map) -> the map outlines that state.
  dumbbell.addSignalListener("area_pick", (name, value) => {
    map.signal("chosen", value).runAsync();
  });
}
