import React, { useEffect, useRef, useState } from 'react';

import {
    Card,
    CardHeader,
    CardBody,
    CardCheckbox,
    CardAction,
    CardAsset,
    CardTimer,
    CardContent,
    CardBadge,
    CardTitle,
    CardSubtitle,
    KeyboardNavigable,
    Box,
  } from '@strapi/design-system';

import { Plus, Pencil } from '@strapi/icons';

import { FloorplanImgData, Floorplan } from './FloorplanTypes';

interface Props {
  floorplanList: Floorplan[];
}

export const FloorplanList: React.FC<Props> = ({floorplanList}) => {
    return (

      
<KeyboardNavigable tagName="article">
  <Card style={{
    width: '240px',
  }} id={0} key={'addFP'} padding={4}>
    <CardBody>
      <Plus></Plus>
      <CardTitle>Add Floorplan</CardTitle>
    </CardBody>
  </Card>
      {floorplanList.map(fp => <Card style={{
    width: '240px',
  }} id={fp.id} key={fp.id}>
      <CardHeader>
        <CardAsset src={fp.floorplanImgData.data} />
        <CardTimer></CardTimer>
      </CardHeader>
      <CardBody>
        <CardContent>
          <CardTitle>{ fp.storeId } - { fp.storeName }</CardTitle>
          <CardSubtitle></CardSubtitle>
        </CardContent>
      </CardBody>
    </Card>)}
</KeyboardNavigable>    )

}