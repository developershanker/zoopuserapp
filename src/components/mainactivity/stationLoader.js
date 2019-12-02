import React from "react";
import { ScrollView, View } from "react-native";
import {
    Fade,
    Loader,
    Placeholder,
    PlaceholderLine,
    PlaceholderMedia,
    Progressive,
    Shine,
    ShineOverlay
} from "rn-placeholder";
import styles from './stationCss.js';
import ConstantValues from "../constantValues.js";
import { OutletCard } from "./OutletCard.js";


export const StationLoader = (props) => {

    const { title = 'Enter', style = {}, textStyle = {}, onPress, visible, activeOpacity } = props;

    return (
        <Fade visible = {visible}>
            <View
                style={styles.slide}>
                <Placeholder
                    style={{ width: ConstantValues.deviceWidth, justifyContent: 'center', alignContent: 'center', alignItems: 'center', margin: 10 }}
                    Animation={Shine}
                >
                    <PlaceholderMedia style={{ width: 0, height: 0, marginTop: 20, margin: 10 }} />
                    <PlaceholderMedia style={{ width: 70, height: 70, borderRadius: 100 / 2, marginLeft: 20, marginTop: 20, margin: 10 }} />
                </Placeholder>

                <Placeholder
                    style={{ alignItems: 'stretch', justifyContent: 'flex-start', margin: 20 }}
                    Animation={Shine}
                    Left={OutletCard}
                >
                    <PlaceholderLine width={80} style={{ margin: 10 }} />
                    <PlaceholderLine />
                    <PlaceholderLine width={30} />
                </Placeholder>
                <Placeholder
                    style={{ alignItems: 'stretch', justifyContent: 'flex-start', margin: 20 }}
                    Animation={Shine}
                    Left={OutletCard}
                >
                    <PlaceholderLine width={80} style={{ margin: 10 }} />
                    <PlaceholderLine />
                    <PlaceholderLine width={30} />
                </Placeholder>
                <Placeholder
                    style={{ alignItems: 'stretch', justifyContent: 'flex-start', margin: 20 }}
                    Animation={Shine}
                    Left={OutletCard}
                >
                    <PlaceholderLine width={80} style={{ margin: 10 }} />
                    <PlaceholderLine />
                    <PlaceholderLine width={30} />
                </Placeholder>
                <Placeholder
                    style={{ alignItems: 'stretch', justifyContent: 'flex-start', margin: 20 }}
                    Animation={Shine}
                    Left={OutletCard}
                >
                    <PlaceholderLine width={80} style={{ margin: 10 }} />
                    <PlaceholderLine />
                    <PlaceholderLine width={30} />
                </Placeholder>
            </View>
        </Fade>
    )

}


