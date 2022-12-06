// import objects
import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    ImageBackground, 
    TouchableOpacity,
    Alert,
    SafeAreaView,
    Dimensions,
} from 'react-native';

// importar para navegar entre pantallas
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        // variables definition
        email:"",
        password:"",
        datosServer:"",
    };
  }

  render() {
    // js programming for objects
    const btnClickRegistro = () => {
        this.props.navigation.navigate("SignIn");
    }
    
    const validacion = () => {
        if(this.state.email==""||this.state.password==""){
            // desplegar alerta
            Alert.alert(
                "ERROR",
                "Por favor ingresa tu correo y contraseña.",
                [{ text: "OK"}]
            );
        }else{
            logIn();
        }
    }

    const logIn = () => {
       
        // save state to call it later inside other object's functions
        let _this = this; 

        var xhttp = new XMLHttpRequest(); // creates object for xmlhttp request

        // defines what to do when readySate changes
        xhttp.onreadystatechange = function() {
            // If readyState=4 server is up and if status=200 succesfull request
            if (this.readyState == 4 && this.status == 200) {
                
                console.log(xhttp.responseText);  

                // Valid login?
                if (xhttp.responseText != "0"){
                    console.log("LOGEADO");
                    // save response and split it on array for each ","
                    let datos= JSON.parse(xhttp.responseText);
                    _this.setState({datosServer:datos}); // save object
                    console.log("JSON recibido: " + datos);   
                    console.log(xhttp.responseText);   
                    
                    // go to next screen and send data 
                    _this.props.navigation.navigate("Pedidos",{name:_this.state.datosServer["name"],id:_this.state.datosServer["id"]});
                }
                else
                {
                    // desplegar alerta
                    Alert.alert(
                        "ERROR",
                        "Correo y/o contraseña incorrectos.",
                        [{ text: "OK"}]
                    );
                    console.log("Credenciales incorrectas");
                    console.log(xhttp.responseText);   
                }
                
            }
        };
        
        // defines the metod (get) // url where to go (dinamic with user input) // asynchronous process (true)
        xhttp.open("GET", "http://tiendapp.freevar.com/tiendappScrips/loginRepartidor.php?email="+this.state.email+"&password="+this.state.password, true);
        console.log("http://tiendapp.freevar.com/tiendappScrips/loginRepartidor.php?email="+this.state.email+"&password="+this.state.password);
        xhttp.send(); // send the request defined above
    }
    
    
    return (
        <SafeAreaView style={styles.background}>
            <ImageBackground
                style={styles.background}
            >
                <View style={styles.espacioLogo}>
                    <Text style={styles.textoTitulo}> Tienda App </Text>
                </View>
                
                <View style={styles.espacioLogin}>
                    <TextInput 
                        style={styles.input}
                        placeholder="Correo"
                        placeholderTextColor={"black"}
                        // get input and save in var email
                        onChangeText={email => this.setState({email})}
                        />
                    <TextInput 
                        placeholderTextColor={"black"}
                        placeholder="Contraseña"
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={password => this.setState({password})}
                        />
                    
                    <TouchableOpacity
                            style={styles.btnEntrar}
                            activeOpacity={0.7}
                            onPress={validacion}
                    > 
                        <Text style={styles.textoBoton}> Entrar </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <TouchableOpacity 
                        style={styles.btnFooter}
                        activeOpacity={0.7}
                        onPress={btnClickRegistro}
                    >
                        <Text style={styles.textoFooter1}>¿Aún no tienes una cuenta?</Text>
                        <Text style={styles.textoFooter2}>¡Regístrate aquí!</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground> 
        </SafeAreaView>
    );
  }
}


// styles
const styles = StyleSheet.create({
    background:{
        backgroundColor: "#F7F9F9",
        // Make sure the bg image stays same size when keyboard displays
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    btnEntrar:{
        width:"50%",
        height: "12%",
        alignSelf: "center",
        marginTop: 20,
        backgroundColor:"#78D5D7",
        // borderWidth:2,
        borderRadius: 8,
        justifyContent:"center",
        alignItems:"center",        
    },
    input:{
        borderWidth: 2,
        fontSize: 25,
        marginTop: 10,
        marginHorizontal: 30,
        borderRadius: 8,
        color:"black",
    },
    textoTitulo:{
        fontWeight:"bold",
        fontSize: 40,
        color: "black",
        textAlign: "center",
        fontFamily:"arial",
    },
    textoBoton:{
        fontSize: 30,
        color:"#F7F9F9",
        fontWeight:"bold",
        
    },
    espacioLogo:{
        flex: 1,
        justifyContent:"center",
    },
    espacioLogin:{
        flex: 1.7,
    },
    footer:{
        flex:0.3,
        justifyContent:"center",
        backgroundColor:"#2081C3"
    }, 
    btnFooter:{
        alignItems:"center",
    },
    textoFooter1:{
        fontSize:20,
        color:"#F7F9F9",
        // fontWeight:"bold",
    },
    textoFooter2:{
        fontSize:20,
        color:"#F7F9F9",
        fontWeight:"bold",
    }
})