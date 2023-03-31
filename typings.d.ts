/*
 * @Author: yuanzhirong
 * @Date: 2023-03-31 10:53:09
 * @LastEditors: yuanzhirong
 * @LastEditTime: 2023-03-31 10:59:00
 * @Description:
 */
declare module "*.css";
declare module "*.less" {
  const classes: { [key: string]: string };
  export default classes;
}
declare module "*.png";
declare module "*.svg" {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>
  ): React.ReactElement;
  const url: string;
  export default url;
}
