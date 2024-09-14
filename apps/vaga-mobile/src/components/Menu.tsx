import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FC, PropsWithChildren, useRef, useState } from 'react';
import { LayoutRectangle, View, ViewStyle } from 'react-native';

import { Button, fontSizes, Icon, Panel, SlideDown, styles } from 'apps-mobile';

export interface Props
{
  icon?: IconProp;
}

const Menu: FC<PropsWithChildren<Props>> = ({ icon, children }) =>
{
  const buttonRef = useRef<View>(null);
  const [ buttonLayoutInWindow, setButtonLayoutInWindow ] = useState<LayoutRectangle>();
  const [ open, setOpen ] = useState(false);

  const containerStyle: ViewStyle =
  {
    borderRadius: 24
  };

  return (
    <>
      <View
        ref={buttonRef}
        onLayout={() =>
        {
          buttonRef.current?.measureInWindow((x, y, width, height) =>
            setButtonLayoutInWindow({ x, y, width, height }));
        }}
      >
        <Button circle onPress={() => setOpen(true)}>
          <Icon icon={icon ?? 'ellipsis-vertical'} />
        </Button>
      </View>
      <SlideDown
        anchorLayoutInWindow={buttonLayoutInWindow}
        anchorX="right"
        visible={open}
        onRequestClose={() => setOpen(false)}
      >
        <Panel style={containerStyle}>
          <View style={styles.rowEnd}>
            <Button circle onPress={() => setOpen(false)}>
              <Icon icon="x" size={fontSizes.medium} />
            </Button>
          </View>
          <View style={styles.marginBottom}>
            {children}
          </View>
        </Panel>
      </SlideDown>
    </>
  );
};

export default Menu;
