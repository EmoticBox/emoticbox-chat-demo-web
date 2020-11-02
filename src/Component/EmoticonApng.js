import React from 'react';
import styled from 'styled-components';

const EmoticonApng = ({emoticonName, index}) => {
    let apic1 = require(`../Emoticons/${emoticonName}/${index}.png`);
    let apic2 = require(`../Emoticons/${emoticonName}/stopImage/${index}.png`);

    return (
        <EmoticonSet>
            <EmoticonThm id="thm" style={{ height: '76px', padding: '7px'}} src={apic2} />
            <EmoticonImg id="imgs" style={{ height: '76px', padding: '7px'}} src={apic1} />
        </EmoticonSet>
    );
}

const EmoticonSet = styled.a`
  height: 80px;
  width: 80px;
  &: #thm {
    display: none;  
  }
  &:hover #thm {
    display: none;  
  }
  &:hover #imgs {
    display: inline;  
  }
`
const EmoticonThm = styled.img`
  display: inline;
`
const EmoticonImg = styled.img`
  display: none;
`

export default EmoticonApng;