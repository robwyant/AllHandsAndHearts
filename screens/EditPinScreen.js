import React, { PureComponent } from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  View,
  Picker,
  Alert
} from 'react-native';
import { Constants, ImagePicker, Permissions } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LabelSelect from 'react-native-label-select';
import { Location } from 'expo';
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv';
import Colors from '../constants/Colors';
import { StyledText } from '../components/StyledText';
import StyledButton from '../components/StyledButton';
import StyledInput from '../components/StyledInput';
import { Feather as Icon } from '@expo/vector-icons';
import Layout from '../constants/Layout';
import TouchableNativeFeedback from '@expo/react-native-touchable-native-feedback-safe';
import Gallery from '../components/Maps/PinImageGallery';

const Separator = ({ style }) => {
  return (
    <View
      style={[
        {
          borderBottomColor: '#f5f7fa',
          borderBottomWidth: 2,
          marginTop: 30,
          marginBottom: 30
        },
        style
      ]}
    />
  );
};
export default class EditPinScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pinTypeSelected: '',
      name: '',
      address: '',
      description: '',
      sourceName: '',
      sourceLink: '',
      latitude: null,
      longitude: null,
      regionId: null,
      pinColor: null,
      pinType: [
        {
          name: 'Affected Area',
          isSelected: false,
          Id: 111,
          color: 'red'
        },
        {
          name: 'Airport',
          isSelected: false,
          Id: 211,
          color: 'purple'
        },
        {
          name: 'Health Facility',
          isSelected: false,
          Id: 311,
          color: 'lime'
        },
        {
          name: 'IDP Camp',
          isSelected: false,
          Id: 411,
          color: 'green'
        },
        {
          name: 'Point of Interest',
          isSelected: false,
          Id: 511,
          color: 'blue'
        },
        {
          name: 'Risk Assessment',
          isSelected: false,
          Id: 711,
          color: 'orange'
        },
        {
          name: 'Partner Locations',
          isSelected: false,
          Id: 622,
          color: 'brown'
        },
        {
          name: 'Other',
          isSelected: false,
          Id: 76661,
          color: 'grey'
        }
      ],
      showToAddLocationQ: 'Press to choose a location type',
      enableLocationTypeButton: true,
      photos: []
    };
  }

  _updatePhotoState = recievedPhotos => {
    this.setState(({ photos }) => ({
      photos: [...recievedPhotos, ...photos]
    }));
  };

  _getColor = name => {
    const matchPin = this.state.pinType.filter(item => item.name === name)[0];
    return matchPin.color;
  };
  _generatePayload = () => {
    const { Id } = this.props;
    const selectedPinType = this.state.pinType.filter(
      item => item.isSelected === true
    )[0];
    const payload = {
      ...this.state,
      id: Id ? Id : '',
      pinType: selectedPinType ? selectedPinType : this.state.pinTypeSelected,
      pinColor: selectedPinType
        ? selectedPinType.color
        : this._getColor(this.state.pinTypeSelected)
    };
    return payload;
  };
  componentWillReceiveProps(nexProps) {
    this.setState(prevState => {
      return { photos: [...nexProps.photos, ...prevState.photos] };
    });
  }
  componentDidUpdate() {
    let selectedItems = this.state.pinType.filter(
      item => item.isSelected === true
    );
    let size = selectedItems ? selectedItems.length : 0;
    this.setState({
      showToAddLocationQ: size < 1 ? 'Press to choose a location type' : '',
      enableLocationTypeButton: size < 1 ? true : false
    });
  }

  async componentWillMount() {
    let {
      latitude,
      longitude,
      regionId,
      PinLocationType__c,
      Name,
      Additional_Descriptors__c
    } = this.props;
    const newPhotos = this.props.photos ? this.props.photos : [];
    try {
      Location.setApiKey(GOOGLE_MAPS_API_KEY);
      const decodedLocation = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
      //get the current location info
      let {
        street,
        name,
        region,
        city,
        country,
        postalCode
      } = decodedLocation[0];

      let pinType = this.state.pinType.map(pin => {
        return pin.name === PinLocationType__c
          ? { ...pin, isSelected: true }
          : pin;
      });

      this.setState({
        name: Name,
        address: `${name ? name : street}, ${city ? city : ''} ${region}, ${
          postalCode ? postalCode : ''
        } ${country}`,
        latitude,
        longitude,
        regionId,
        pinType: pinType,
        description: Additional_Descriptors__c,
        photos: [...this.state.photos, ...newPhotos]
      });
    } catch (e) {
      console.log(e);
    }
  }

  selectConfirm = list => {
    let pinType = this.state.pinType.map((item, index) => {
      let foundItem = list.find(ele => ele.Id === item.Id);
      return foundItem ? { ...foundItem, isSelected: true } : item;
    });
    this.setState({
      pinType
    });
  };

  deleteItem = item => {
    let { pinType } = this.state;
    var newItems = pinType.map(pin => {
      return pin.Id === item.Id ? { ...pin, isSelected: false } : pin;
    });
    this.setState({
      pinType: newItems
    });
  };

  _handleOnChangeText = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  _handleEditPinSubmit = currentMarkerList => {
    const payload = this._generatePayload();
    if (!payload || !payload.name || !payload.description || !payload.pinType) {
      Alert.alert('All * marked inputs are required');
      return;
    }
    this.props.setPinByRegion(this.state.regionId, {
      ...payload
    });
    this.props.navigation.goBack();
  };

  _hideKeyboard = () => {
    Keyboard.dismiss();
  };

  _pickImage = async () => {
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);
    if (status === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        allowsEditing: false,
        base64: true
      });
      this._updatePhotoState([pickerResult]);
    }
  };

  renderLocationTypeAndroid = () => {
    return (
      <View style={styles.androidLocationType}>
        <Picker
          selectedValue={this.state.pinTypeSelected}
          onValueChange={itemValue => {
            this.setState({ pinTypeSelected: itemValue });
          }}
          enabled={true}
        >
          {this.state.pinType.map((item, index) => (
            <Picker.Item
              key={`${item.name}${index}`}
              label={item.name}
              value={item.name}
            />
          ))}
        </Picker>
      </View>
    );
  };
  renderLocationType = () => {
    return (
      <View style={{ marginBottom: 10 }}>
        {Constants.platform.android && this.renderLocationTypeAndroid()}
        {Constants.platform.ios && (
          <LabelSelect
            title="Choose a type"
            ref={element => (this.select = element)}
            style={styles.labelSelect}
            onConfirm={this.selectConfirm}
            addButtonText={this.state.showToAddLocationQ}
            customStyle={{
              addButtonText: {
                color: '#1D2C3C',
                padding: 6,
                fontSize: 14,
                lineHeight: 20,
                maxWidth: 300
              },
              addButton: {
                padding: 9
              }
            }}
            enableAddBtn={this.state.enableLocationTypeButton}
          >
            {this.state.pinType
              .filter(item => item.isSelected)
              .map((item, index) => (
                <LabelSelect.Label
                  key={'label-' + index}
                  data={item}
                  onCancel={() => {
                    this.deleteItem(item);
                  }}
                  customStyle={{
                    text: {
                      color: '#1D2C3C',
                      padding: 6,
                      fontSize: 14,
                      lineHeight: 20,
                      maxWidth: 300
                    }
                  }}
                >
                  {item.name}
                </LabelSelect.Label>
              ))}
            {this.state.pinType
              .filter(item => !item.isSelected)
              .map((item, index) => {
                return (
                  <LabelSelect.ModalItem
                    key={'modal-item-' + index}
                    data={item}
                    customStyle={{
                      innerCircle: {
                        backgroundColor: Colors.defaultColor.PRIMARY_COLOR
                      }
                    }}
                  >
                    {item.name}
                  </LabelSelect.ModalItem>
                );
              })}
          </LabelSelect>
        )}
      </View>
    );
  };

  renderEditPinBody = () => {
    const { hasPinData, markerIds } = this.props;
    const latitude = hasPinData ? this.props.latitude : this.state.latitude;
    const longitude = hasPinData ? this.props.longitude : this.state.longitude;
    const { name, description } = this.state;

    const coordsString = `${parseFloat(latitude).toFixed(6)}, ${parseFloat(
      longitude
    ).toFixed(6)}`;

    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: Colors.defaultColor.PAPER_COLOR, flex: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 30 }}>
          <StyledText
            style={{
              color: '#1D2C3C',
              fontSize: 18,
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 16,
              fontWeight: '500',
              textAlign: 'left',
              backgroundColor: 'transparent'
            }}
          >
            LOCATION
          </StyledText>
          <StyledText style={styles.styledText}>NAME *</StyledText>
          <StyledInput
            style={styles.input}
            value={name ? name : null}
            placeholder={'Enter location name'}
            returnKeyType="next"
            enablesReturnKeyAutomatically
            inputRef={element => (this.locationNameRef = element)}
            onSubmitEditing={() => this.descriptionRef.focus()}
            onChangeText={value => this._handleOnChangeText('name', value)}
          />
          <StyledText style={styles.styledText}>ADDRESS</StyledText>
          <StyledInput
            style={styles.input}
            value={`${hasPinData ? this.props.Address__c : this.state.address}`}
            placeholder={'Enter address if any'}
            returnKeyType="next"
            enablesReturnKeyAutomatically
            inputRef={element => (this.addressRef = element)}
            onSubmitEditing={() => this.descriptionRef.focus()}
            onChangeText={value => this._handleOnChangeText('address', value)}
          />
          <StyledText style={styles.styledText}>COORDINATES *</StyledText>
          <StyledInput
            style={[
              styles.input,
              {
                marginBottom: 10
              }
            ]}
            value={latitude && coordsString}
            placeholder={'Enter latitude and longitude separated by comma'}
            returnKeyType="next"
            enablesReturnKeyAutomatically
            inputRef={element => (this.coordinatesRef = element)}
            onSubmitEditing={() => this.descriptionRef.focus()}
          />
          <StyledText style={styles.styledText}>DESCRIPTION *</StyledText>
          <StyledInput
            style={styles.inputWide}
            inputRef={element => (this.descriptionRef = element)}
            value={description ? description : null}
            placeholder={
              'Enter description and any relevant details of the area.'
            }
            enablesReturnKeyAutomatically
            multiline
            numberOfLines={4}
            onChangeText={value =>
              this._handleOnChangeText('description', value)
            }
          />

          <StyledText style={styles.styledText}>TYPE *</StyledText>

          {this.renderLocationType()}
          <Separator />
        </View>
        <View>
          <StyledText
            style={{
              color: '#1D2C3C',
              fontSize: 18,
              marginBottom: 10,
              marginLeft: 16,
              fontWeight: '500',
              textAlign: 'left',
              backgroundColor: 'transparent'
            }}
          >
            PHOTOS (max 3)
          </StyledText>
          {this.state.photos.length < 3 && (
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 16,
                marginRight: 16,
                marginBottom: 10,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <View
                style={{
                  backgroundColor: 'transparent',
                  borderRightColor: '#f5f7fa',
                  borderRightWidth: 2
                }}
              >
                <TouchableNativeFeedback
                  onPress={() => {
                    this.props.navigation.navigate('Camera', {
                      savePhoto: this._updatePhotoState
                    });
                  }}
                >
                  <View
                    style={{
                      backgroundColor: 'transparent'
                    }}
                  >
                    <Icon
                      name="camera"
                      color="#1D2C3C"
                      size={34}
                      style={{
                        backgroundColor: 'transparent',
                        alignSelf: 'center',
                        marginTop: 6
                      }}
                    />
                    <StyledText style={styles.styledText}>
                      Capture a photo
                    </StyledText>
                  </View>
                </TouchableNativeFeedback>
              </View>

              <View>
                <TouchableNativeFeedback onPress={this._pickImage}>
                  <View
                    style={{
                      backgroundColor: 'transparent'
                    }}
                  >
                    <Icon
                      name="upload"
                      color="#1D2C3C"
                      size={34}
                      style={{
                        backgroundColor: 'transparent',
                        alignSelf: 'center',
                        marginTop: 6
                      }}
                    />
                    <StyledText style={styles.styledText}>
                      Choose a photo
                    </StyledText>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          )}
          <Gallery photos={this.state.photos} />
          <Separator />
        </View>
        <View>
          <StyledText
            style={{
              color: '#1D2C3C',
              fontSize: 18,
              marginTop: 10,
              marginBottom: 10,
              marginLeft: 16,
              fontWeight: '500',
              textAlign: 'left',
              backgroundColor: 'transparent'
            }}
          >
            SOURCE
          </StyledText>

          <StyledText style={styles.styledText}>NAME</StyledText>
          <StyledInput
            style={styles.input}
            inputRef={element => (this.sourceNameRef = element)}
            onSubmitEditing={() => this.sourceLinkRef.focus()}
            placeholder={'Enter source name'}
            returnKeyType="next"
            enablesReturnKeyAutomatically
            onChangeText={value =>
              this._handleOnChangeText('sourceName', value)
            }
          />
          <StyledText style={styles.styledText}>LINK</StyledText>
          <StyledInput
            style={styles.input}
            inputRef={element => (this.sourceLinkRef = element)}
            returnKeyType="next"
            enablesReturnKeyAutomatically
            placeholder="https://example.com"
            onChangeText={value =>
              this._handleOnChangeText('sourceLink', value)
            }
          />
          <Separator />
        </View>
        <StyledButton
          style={styles.addPinButton}
          textStyle={styles.addButtonTextStyle}
          text={hasPinData ? 'Update Location' : 'Add Location'}
          onPress={() => this._handleEditPinSubmit(markerIds)}
        />
      </KeyboardAwareScrollView>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback
          pointerEvents="box-none"
          style={{
            flex: 1
          }}
          transparent
          onPress={this._hideKeyboard}
        >
          {this.renderEditPinBody()}
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  styledText: {
    color: '#1D2C3C',
    margin: 20,
    marginTop: 10,
    marginBottom: 2,
    fontSize: 14
  },
  input: {
    height: 42,
    color: '#1D2C3C',
    backgroundColor: '#EDEFF2',
    borderRadius: 10,
    margin: 0,
    marginTop: 4,
    fontSize: 14
  },
  inputWide: {
    height: 110,
    color: '#1D2C3C',
    backgroundColor: '#EDEFF2',
    borderRadius: 10,
    margin: 0,
    marginTop: 4,
    fontSize: 14,
    paddingVertical: 10
  },
  addPinButton: {
    height: 42,
    backgroundColor: Colors.defaultColor.PRIMARY_COLOR
  },
  addButtonTextStyle: {
    color: Colors.defaultColor.PAPER_COLOR
  },
  labelSelect: {
    flex: 1,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    padding: 2.5,
    borderRadius: Colors.Input.BORDER.RADIUS,
    backgroundColor: '#EDEFF2'
  },
  androidLocationType: {
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingHorizontal: 10,
    height: 42,
    backgroundColor: Colors.defaultColor.PAPER_COLOR,
    borderColor: '#BFBFC0',
    borderWidth: 0.3,
    borderRadius: Colors.Input.BORDER.RADIUS,
    backgroundColor: '#EDEFF2'
  }
});
