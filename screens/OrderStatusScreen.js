import React, { useState, useEffect, useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  RefreshControl
} from 'react-native';
import axios from 'axios';
import CustomButton from '../components/Button';
import NextButton from '../components/NextButton';
import { MonoText } from '../components/StyledText';
import { getMenuItems, getOrderStatus } from '../utils/utils.js';
import { THEME } from '../constants/Theme.js';
import { UserContext } from '../context/AppContext';
import customInput from '../components/CustomInput';


export default OrderStatusScreen = (props) => {

  let { navigation } = props;
  let selectedMenuItem = navigation.state.params.selectedMenuItem;
  let orderId = navigation.state.params?.orderId;
  let selectedToppings = navigation.state.params.selectedToppings;
  let selectedCommunity = navigation.state.params ?.selectedCommunity;
  let note = navigation.state.params.note;
  const [order, setOrder] = useState();
  const [refreshOrder, setRefreshOrder] = useState(false);
  const [user, setUser] = useContext(UserContext);

  useEffect(()=> {
    if(orderId != null && orderId > 0 && (refreshOrder === null || refreshOrder === true)){
    getOrderStatus(orderId).then((response) => {
      setOrder(response);
    })
    if(refreshOrder)
    {
      setRefreshOrder(false);
    }
  } else {
    //get last pending order for user
  }
  }, [refreshOrder])

  const refreshOrderHandler = () => {
    setRefreshOrder(true)
  }

  return (
    <View style={styles.container}>
      <View
        style={{ flex: 9 }}
        contentContainerStyle={styles.contentContainer}>
        <ScrollView  refreshControl={
          <RefreshControl refreshing={refreshOrder} onRefresh={refreshOrderHandler}
          />
        }>
        <View style={{ flexDirection: "row", marginBottom: 40 }}>
            <View style={{ flex: 4 }}>
              <View style={{ backgroundColor: THEME.GREEN_PRIMARY, height: 2, width: "100%", zIndex: 20000, marginTop:8}}></View>
            </View>
            {/* Pending Circle */}
            <View style={{ flex: 1,  flexDirection: "column" }}>
              <View style={{backgroundColor: "white", width: "100%", height: 20, borderRadius: 50, borderWidth: 5, borderColor: THEME.GREEN_PRIMARY }}>
              </View>
                <View style={{width:200, marginLeft: -17}}><Text style={{fontSize: 12, color: THEME.GREEN_PRIMARY}}>Pending</Text>
                </View>
            </View>
            <View style={{ flex: 5 }}>
            <View style={{ backgroundColor: order?.status == "Acknowledged" || order?.status == "Complete" ? THEME.GREEN_PRIMARY : THEME.GREY_MEDIUM, height: 2, width:"100%", zIndex: -1, marginTop:8}}></View>
            </View>
            {/* In progress Circle */}
            <View style={{ flex: 1,  flexDirection: "column" }}>
              <View style={{backgroundColor: "white", width: "100%", height: 20, borderRadius: 50, borderWidth: 5, borderColor: order?.status == "Acknowledged" || order?.status == "Complete" ? THEME.GREEN_PRIMARY : THEME.GREY_MEDIUM,}}>
              </View>
                <View style={{width:200, marginLeft: -17}}><Text style={{fontSize: 12, color:  order?.status == "Acknowledged" ||order?.status == "Complete" ? THEME.GREEN_PRIMARY : THEME.GREY_MEDIUM}}>In Progress</Text>
                </View>
            </View>
            <View style={{ flex: 5 }}>
            <View style={{ backgroundColor:  order?.status == "Complete" ? THEME.GREEN_PRIMARY : THEME.GREY_MEDIUM, height: 2, width: "100%", zIndex: -1, marginTop:8}}></View>
            </View>
            {/* Completed Circle */}
            <View style={{ flex: 1,  flexDirection: "column" }}>
              <View style={{backgroundColor: "white", width: "100%", height: 20, borderRadius: 50, borderWidth: 5, borderColor:  order?.status == "Complete" ? THEME.GREEN_PRIMARY : THEME.GREY_MEDIUM }}>
              </View>
                <View style={{width:200, marginLeft: -17}}><Text style={{fontSize: 12, color:  order?.status == "Complete" ? THEME.GREEN_PRIMARY : THEME.GREY_MEDIUM}}>Out for delivery</Text>
                </View>
            </View>
            <View style={{ flex: 4 }}>
              <View style={{ backgroundColor:  order?.status == "Complete" ? THEME.GREEN_PRIMARY : THEME.GREY_MEDIUM, height: 2, width: "100%", zIndex: 20000, marginTop:8}}></View>
            </View>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 25 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, marginBottom: 15 }}>{"Personal Info:  "}</Text>
            </View>
            <View style={{ flexDirection: "column", flex: 3 }}>
              <View>
                <Text style={{ fontSize: 13, marginBottom: 8 }}>{`${user.firstName} ${user.lastName}`}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 13, marginBottom: 8 }}>{user.email}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 13, marginBottom: 8 }}>{`${user.addressLine1} ${user ?.addressLine2 ? user.addressLine2 : ""}`}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 13, marginBottom: 8 }}>{user.city.name}</Text>
              </View>
              <View>
                <Text style={{ fontSize: 13, marginBottom: 8 }}>{selectedCommunity.name}</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 14, marginBottom: 15 }}>{"Item:  "}</Text>
            </View>
            <View style={{ flexDirection: "column", flex: 3 }}>
              <View>
                <Text style={{ fontSize: 14, marginBottom: 15, fontWeight: "400" }}>{selectedMenuItem.name}</Text>
              </View>
              {selectedToppings ?.map(x => {
                return <Text style={{ fontSize: 14 }} key={`${x.id}${x.name}`}>{`${x.name} `}</Text>
              })}
            </View>
          </View>
          <View style={{ flex: 1, marginTop: 30 }}>
          <View>
            <Text style={{ fontSize: 14, marginBottom: 15 }}>{`Special instructions:`}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 14 }}>{`${note != undefined ? note : ""}`}</Text>
          </View>
        </View>
        </ScrollView>
      </View>
      <View style={{ flex: 1 }}>
      </View>
    </View >
  );
}

OrderStatusScreen.navigationOptions = {
  title: 'Status',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: THEME.GREY_LIGHT_BACKGROUND,
  },
});
