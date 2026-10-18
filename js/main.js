// Embed every Vega-Lite chart. One idiom per .vg.json file in this folder.
const charts = ["01_isotype", "02_heatmap", "03_bump", "04_slope", "05_small_multiples", "06_choropleth", "07_dumbbell", "08_dotmap", "09_propsymbol", "10_parallel", "11_waffle", "12_polar"];
const opts = { renderer: "svg" };  // default vega-embed options, as in the Week 7 tutorial: the "..." menu (save as SVG/PNG, view source, open in Vega Editor) stays on
// Wait for the web fonts first, so Vega measures label widths with the real typeface.
document.fonts.ready.then(() => {
  charts.forEach(name => {
    vegaEmbed("#vis-" + name, "js/" + name + ".vg.json", opts)
      .catch(err => {
        document.querySelector("#vis-" + name).textContent = "This chart could not be loaded.";
        console.error(name, err);
      });
  });
});
