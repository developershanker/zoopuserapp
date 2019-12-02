import React from "react";
import { View ,Dimensions} from "react-native";
import {
    Fade,
    Placeholder,
    PlaceholderLine,
    PlaceholderMedia,
    ShineOverlay,
    Shine
} from "rn-placeholder";
import styles from './menuCss.js';
import ConstantValues from "../constantValues.js";
import { MenuCard } from "./MenuCard.js";


export const MenuLoader = (props) => {

    const { visible } = props;

    return (
        <Fade visible={visible}>
            <View
                style={styles.slide}>
                <Placeholder
                    Animation={Shine}
                    style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: Dimensions.get('screen').width - 80, paddingTop: 10 }}
                >
                    <PlaceholderLine width={60} style={{ margin: 10 ,alignSelf:'center'}} />
                    <PlaceholderLine width={30} style={{ margin: 10 ,alignSelf:'center'}}/>
                    <PlaceholderMedia style={{width: Dimensions.get('window').width,alignSelf:'center',height: 60,borderRadius: 6,margin:20}} />
                </Placeholder>
                <Placeholder
                style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: Dimensions.get('screen').width, margin: 10 }}
                    Animation={Shine}
                    Right = {MenuCard}
                >
                    <PlaceholderLine  width={40} height={30}  style={{ margin: 10 }} />
                    <PlaceholderLine width={60} style={{ margin: 10,}} />
                    <PlaceholderLine width={30} style={{ margin: 10, }} />
                    
                </Placeholder>
                <Placeholder
                style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: Dimensions.get('screen').width, margin: 10 }}
                    Animation={Shine}
                    Right = {MenuCard}
                >
                    <PlaceholderLine  width={40} height={30}  style={{ margin: 10 }} />
                    <PlaceholderLine width={60} style={{ margin: 10,}} />
                    <PlaceholderLine width={30} style={{ margin: 10, }} />
                    
                </Placeholder>
                <Placeholder
                style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: Dimensions.get('screen').width, margin: 10 }}
                    Animation={Shine}
                    Right = {MenuCard}
                >
                    <PlaceholderLine  width={40} height={30}  style={{ margin: 10 }} />
                    <PlaceholderLine width={60} style={{ margin: 10,}} />
                    <PlaceholderLine width={30} style={{ margin: 10, }} />
                    
                </Placeholder>
                <Placeholder
                style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: Dimensions.get('screen').width, margin: 10 }}
                    Animation={Shine}
                    Right = {MenuCard}
                >
                    <PlaceholderLine  width={40} height={30}  style={{ margin: 10 }} />
                    <PlaceholderLine width={60} style={{ margin: 10,}} />
                    <PlaceholderLine width={30} style={{ margin: 10, }} />
                    
                </Placeholder>
            </View>
        </Fade>
    )

}


