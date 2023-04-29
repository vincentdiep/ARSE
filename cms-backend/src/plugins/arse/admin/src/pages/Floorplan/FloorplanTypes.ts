export interface FloorplanImgData {
  xml?: string;
  data?: string;
}
export interface Floorplan {
    lastModified: Date;
    floorplanImgData: FloorplanImgData;
    id: number,
    storeName: string,
    storeId: number,
  }