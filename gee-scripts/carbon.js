// HIMALAYA CARBON LABS — Carbon + CO2e
// Carbon = AGB * 0.47 | CO2e = Carbon * 3.67

var pilot = ee.Geometry.Rectangle([78.40, 30.70, 78.55, 30.80]);

var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(pilot)
    .filterDate('2026-01-01', '2026-10-30')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));

var composite = s2.median().clip(pilot);
var ndvi = composite.normalizedDifference(['B8', 'B4']).rename('NDVI');

var agb = ndvi.multiply(120);
var carbon = agb.multiply(0.47).rename('Carbon_t_per_ha');
var co2e = carbon.multiply(3.67).rename('CO2e_t_per_ha');

Map.centerObject(pilot, 12);
Map.addLayer(co2e, { min: 0, max: 400, palette: ['white', 'yellow', 'orange', 'red'] }, 'CO2e (t/ha)');

var meanCo2e = co2e.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: pilot, scale: 10, maxPixels: 1e9
});
print('Mean CO2e (t/ha):', meanCo2e);