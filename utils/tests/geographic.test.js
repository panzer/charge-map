import mgrs from "mgrs";
import { LatLonRegion } from "../geographic";

describe("mgrs base functionality", () => {
  it("converts lat/lon to mgrs", () => {
    // input in long, lat order
    expect(mgrs.forward([-71, 42])).toBe("19TCG3436151711");
  });
});

describe("lat/lon precision", () => {
  it("works for 10", () => {
    expect(LatLonRegion.setPrecision(123.456, 10)).toBe(120);
  });
  it("works for 1", () => {
    expect(LatLonRegion.setPrecision(123.456, 1)).toBe(123);
  });
  it("works for 0.1", () => {
    expect(LatLonRegion.setPrecision(123.456, 0.1)).toBe(123.4);
  });
  it("works for 0.01", () => {
    expect(LatLonRegion.setPrecision(123.456, 0.01)).toBe(123.45);
  });
  it("works for 0.001", () => {
    expect(LatLonRegion.setPrecision(123.4567, 0.001)).toBe(123.456);
  });
});
