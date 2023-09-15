export interface InsightProps {
  name: string
  center: Center
  imageryDate: ImageryDate
  regionCode: string
  solarPotential: SolarPotential
  boundingBox: BoundingBox
  imageryQuality: string
  imageryProcessedDate: ImageryProcessedDate
}

export interface Center {
  latitude: number
  longitude: number
}

export interface ImageryDate {
  year: number
  month: number
  day: number
}

export interface SolarPotential {
  maxArrayPanelsCount: number
  maxArrayAreaMeters2: number
  maxSunshineHoursPerYear: number
  carbonOffsetFactorKgPerMwh: number
  wholeRoofStats: WholeRoofStats
  roofSegmentStats: RoofSegmentStat[]
  solarPanelConfigs: SolarPanelConfig[]
  panelCapacityWatts: number
  panelHeightMeters: number
  panelWidthMeters: number
  panelLifetimeYears: number
  buildingStats: BuildingStats
  solarPanels: SolarPanel[]
}

export interface WholeRoofStats {
  areaMeters2: number
  sunshineQuantiles: number[]
  groundAreaMeters2: number
}

export interface RoofSegmentStat {
  pitchDegrees: number
  azimuthDegrees: number
  stats: Stats
  center: Center2
  boundingBox: BoundingBox
  planeHeightAtCenterMeters: number
}

export interface Stats {
  areaMeters2: number
  sunshineQuantiles: number[]
  groundAreaMeters2: number
}

export interface Center2 {
  latitude: number
  longitude: number
}

export interface BoundingBox {
  sw: Sw
  ne: Ne
}

export interface Sw {
  latitude: number
  longitude: number
}

export interface Ne {
  latitude: number
  longitude: number
}

export interface SolarPanelConfig {
  panelsCount: number
  yearlyEnergyDcKwh: number
  roofSegmentSummaries: RoofSegmentSummary[]
}

export interface RoofSegmentSummary {
  pitchDegrees: number
  azimuthDegrees: number
  panelsCount: number
  yearlyEnergyDcKwh: number
  segmentIndex: number
}

export interface BuildingStats {
  areaMeters2: number
  sunshineQuantiles: number[]
  groundAreaMeters2: number
}

export interface SolarPanel {
  center: Center3
  orientation: string
  yearlyEnergyDcKwh: number
  segmentIndex: number
}

export interface Center3 {
  latitude: number
  longitude: number
}

export interface BoundingBox {
  sw: Sw2
  ne: Ne2
}

export interface Sw2 {
  latitude: number
  longitude: number
}

export interface Ne2 {
  latitude: number
  longitude: number
}

export interface ImageryProcessedDate {
  year: number
  month: number
  day: number
}
