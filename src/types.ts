export interface Dimension {
  [name: string]: any
}

export interface Property {
  [name: string]: any
}

export interface Metric {
  type: string
  name: string
  value: number
  dimensions: Dimension
  properties: Property
}

export interface Event {
  title: string
  text: string
  alert_type: string
  tags: string[]
  host: string
}
