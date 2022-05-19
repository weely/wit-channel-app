import { cdnBase } from '../config/index';
const imgPrefix = cdnBase;

const defaultDesc = [`${imgPrefix}/goods/details-1.png`];

const allGoods = [
  {
    id: '135686633',
    title: 'T恤',
    resume: '纯色纯棉休闲圆领短袖T恤纯白亲肤厚柔软细腻面料纯白短袖套头T恤',
    primaryImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08b.png',
    minSalePrice: '25900',
    maxSalePrice: '26900',
    images: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08a.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08a1.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08b.png',
    ],
    isAvailable: 1,
    soldNum: 1032,
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-08d.png',
    ],
  },
  {
    id: '135691628',
    title: '运动上衣',
    resume: '运动连帽拉链卫衣休闲开衫长袖多色运动细绒面料运动上衣',
    images: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17a.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17a1.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17b.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17b1.png',
    ],
    primaryImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17a.png',
    minSalePrice: '25900',
    maxSalePrice: '26900',
    isAvailable: 1,
    soldNum: 1022,
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/nz-17d.png',
    ],
  },
  {
    id: '135686623',
    title: '机顶盒',
    resume: '腾讯极光盒子4智能网络电视机顶盒6K千兆网络机顶盒4K高分辨率',
    primaryImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-3a.png',
    images: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-3a.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-3b.png',
    ],
    minSalePrice: '9900',
    maxSalePrice: '10900',
    isAvailable: 1,
    soldNum: 102,
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-3c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-3d.png',
    ],
  },
  {
    id: '135681628',
    title: '午休毯连帽披肩',
    resume: '带帽午休毯虎年款多功能加厚加大加绒简约多功能午休毯连帽披肩',
    primaryImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3a.png',
    images: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3a.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3a1.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3b.png',
    ],
    minSalePrice: '29900',
    maxSalePrice: '39900',
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/muy-3d.png',
    ],
    isAvailable: 1,
    soldNum: 102,
  },
  {
    id: '135681626',
    title: '耳机',
    resume: '迷你便携高颜值蓝牙无线耳机立体声只能触控式操作简约立体声耳机',
    primaryImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2a.png',
    images: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2a.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2a1.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2b.png',
    ],
    minSalePrice: '29000',
    maxSalePrice: '39000',
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/dz-2d.png',
    ],
    isAvailable: 1,
    soldNum: 102,
  },
  {
    id: '135681624',
    title: '不锈钢刀叉勺套装',
    resume: '不锈钢刀叉勺套装家用西餐餐具ins简约耐用不锈钢金色银色可选',
    primaryImage: 'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-2b.png',
    images: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-2a.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-2a1.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-2b.png',
    ],
    available: 1,
    minSalePrice: '19900',
    maxSalePrice: '29900',
    soldNum: 102,
    desc: [
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-2c.png',
      'https://cdn-we-retail.ym.tencent.com/tsr/goods/gh-2d.png',
    ],
  },
]

/**
 * @param {string} id
 */
 export function genGood(id) {
  const item = allGoods[id % allGoods.length];
  return {
    ...item,
    goodId: `${id}`,
    desc: item?.desc || defaultDesc,
    images: item?.images || [item?.primaryImage],
  };
}