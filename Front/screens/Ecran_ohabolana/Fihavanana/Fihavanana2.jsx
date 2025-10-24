import { View, Text,StyleSheet,ScrollView} from 'react-native'
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient';

const Fihavanana2 = () => {
  return (
    <View style={styles.container}>
      {/* <View> */}
      <LinearGradient
        colors={['#FFF7F0', '#FDE6D0', '#FFCA6F']}
        style={styles.gradient}
      >
        <Text style={styles.titre}>Ohabolana</Text>
        <View style={styles.ohabolana}>
          <View>
            <FontAwesome name="quote-left" size={12} style={styles.quote_left}/>
            {/* asina anle coeur */}
          </View>
            <Text style={styles.description}>Izay mahavangivangy tian-kavana; ny malemy fanahy tratra amp-parany.</Text>
          <FontAwesome name="quote-right" size={12} style={styles.quote_right}/>
        </View>
      </LinearGradient>

      <View style={styles.corps}>
        <Text style={styles.titrefanazavana}>Fanazavana</Text>
        <ScrollView >
          <Text style={styles.fanazavana}>Izay mahavangivangy tian-kavana; ny malemy fanahy tratra am-parany" dia ohabolana roa samy hafa nefa matetika atambatra noho izy miray hevitra amin'ny lafiny iray.</Text>

          <Text style={styles.fanazavana}>1. "Izay mahavangivangy tian-kavana"</Text>
          <Text style={styles.fanazavana}>Fanazavana amin'ny antsipiriany:</Text>
          <Text style={styles.fanazavana}>"Mahavangivangy": Midika hoe mahay na tia mamangy. Ny "mamangy" eto dia tsy hoe fitsidihana fotsiny, fa midika koa hoe mifampitsidika, mifampijery, mifampitantana, ary mampiseho fifandraisana tsy tapaka. Manondro olona mavitrika sy tsy misalasala mifampiresaka ary mitazona ny fifandraisana amin'ny havany.</Text>

          <Text style={styles.fanazavana}>"Tian-kavana": Midika hoe tian'ny havany na ny fianakaviany.</Text>

          <Text style={styles.fanazavana}>Heviny lalina:</Text>
          <Text style={styles.fanazavana}>Ity ohabolana ity dia manasongadina ny maha-zava-dehibe ny fihazonana ny fifandraisana amin'ny fianakaviana sy ny havana. Ireo olona mandray andraikitra hifampitsidika, hifanome vaovao, sy hifandray tsy tapaka dia matetika no lasa irakofana sy tian'ny havany. Izany dia satria ny fampisehoana fahalianana sy fikarakarana dia manamafy ny fatoram-pianakaviana sy miteraka fifampitokisana.</Text>

          <Text style={styles.fanazavana}>2. "Ny malemy fanahy tratra am-parany"</Text>
          <Text style={styles.fanazavana}>Io tapany faharoa io kosa dia midika hoe: "Ny malemy fanahy no tratra amin'ny farany (izany hoe, mahazo izay tadiaviny na mahazo valisoa)."</Text>

          <Text style={styles.fanazavana}>Fanazavana amin'ny antsipiriany:</Text>
          <Text style={styles.fanazavana}>"Malemy fanahy": Midika hoe tsy mahery setra, tsy maika, manam-paharetana, manetry tena, ary tsy be fiteny. Olona mahay miandry sy mandefitra.</Text>

          <Text style={styles.fanazavana}>"Tratra am-parany": Midika hoe mahazo izay tadiaviny amin'ny farany, na mahazo ny valisoany, na mahazo fahombiazana. Manondro vokatra tsara rehefa avy nanam-paharetana sy nanao izay mety.</Text>

          <Text style={styles.fanazavana}>Heviny lalina:</Text>
          <Text style={styles.fanazavana}>Ity ohabolana ity dia mampianatra momba ny paharetana, ny fanetren-tena, ary ny herin'ny fahalemem-panahy. Amin'ny fiainana, matetika ny olona maika sy be fikoropahana no toa mahazo zavatra haingana, saingy mety tsy haharitra izany na hiteraka olana hafa. Ny ohabolana kosa dia milaza fa ireo olona manam-paharetana, manao zavatra amim-pahendrena sy am-pitoniana, ary tsy mikaroka fifandirana, dia hahazo ny vokatra tsara amin'ny farany. Mety tsy haingana izany, fa ho azo antoka sy haharitra.</Text>


        </ScrollView>
      </View>
    </View>
  )
}

export default Fihavanana2

const styles = StyleSheet.create({
  container:{
     backgroundColor:'#FFCA6F'
  },
  titre:{
    textAlign:"center",
    marginTop:10
  },
  ohabolana:{
    width:300,
    height:120,
    backgroundColor:"#FDE6D0",
    marginLeft:'12%',
    borderRadius:20,
    marginTop:10
    // alignItems:"center"
  },
  quote_left:{
    marginTop: 10,
    marginLeft:10
  },
  quote_right:{
    marginLeft:'88%'
  },
  description : {
    alignItems : "center",
    textAlign : "center",
    justifyContent:"center",
    margin : 10,
    fontSize : 18
  },
  corps:{
    marginTop:30,
    backgroundColor:"white",
    backgroundColor:'#FFF7F7',
    height:800,
    borderRadius: 40
  },
  titrefanazavana:{
    marginLeft:'12%',
    marginTop:20,
    fontSize:15,
    fontWeight:"bold"
  },
  fanazavana:{
    marginLeft:'12%',
    marginTop:20,
    fontSize:15
  },
  petitTitre:{
    marginTop:10
  }
})