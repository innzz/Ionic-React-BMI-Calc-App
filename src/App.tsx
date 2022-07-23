import React, {useRef,useState} from 'react';
import { IonApp, IonButton, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonRow, IonTitle, IonToolbar, setupIonicReact, IonAlert, IonSegment, IonSegmentButton } from '@ionic/react';

import {calculatorOutline,refreshOutline} from 'ionicons/icons'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [calculatedBmi,setCalculatedBmi] = useState<number>()
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const [error,setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<'mkg' | 'ftlbs'>('mkg');

  const calculateBmi = ()=>{
    const eneteredHeight = heightInputRef.current!.value;
    const eneteredWeight = weightInputRef.current!.value;
    
    if (!eneteredHeight || !eneteredWeight || +eneteredHeight <= 0 || +eneteredWeight <= 0) {
      setError('Please enter a valid (non negative) input number.')
      return;
    }

    const weightConversion = calcUnits === 'ftlbs' ? 2.2 : 1;
    const heightConversion = calcUnits === 'ftlbs' ? 3.28 : 1;

    const weight = +eneteredWeight / weightConversion;
    const height = +eneteredHeight / heightConversion;

    const bmi = weight / (height * height)

    setCalculatedBmi(bmi);
  }

  const reset = ()=>{
    weightInputRef.current!.value = '';
    heightInputRef.current!.value = '';
  }

  const resetError = ()=>{
    setError('')
  }

  const inputChangeHandler = (e: CustomEvent) =>{
    setCalcUnits(e.detail.value);
  }

  return (
    <React.Fragment>
      <IonAlert
      isOpen={!!error}
      message={error}
      buttons={[{text: 'Okay', handler: resetError}]}
      />
  <IonApp>
    <IonHeader>
      <IonToolbar>
        <IonTitle>BMI CALCULATOR</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className='ion-padding'>
      <IonRow>
        <IonCol>
        <IonSegment value={calcUnits} onIonChange={inputChangeHandler}>
        <IonSegmentButton value='mkg'>
          <IonLabel>m/kgs</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value='ftlbs'>
          <IonLabel>ft/lbs</IonLabel>
        </IonSegmentButton>
      </IonSegment>
        </IonCol>
      </IonRow>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position='floating'>
                Your height ({calcUnits === 'mkg' ? 'meters' : 'feet'})
              </IonLabel>
              <IonInput type='number' ref={heightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position='floating'>
                Your weight ({calcUnits === 'mkg' ? 'kg' : 'lbs'})
              </IonLabel>
              <IonInput type='number' ref={weightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className='ion-text-left'>
            <IonButton onClick={calculateBmi}>
              <IonIcon slot='start' icon={calculatorOutline} />
              Calculate
            </IonButton>
          </IonCol>
          <IonCol className='ion-text-right'>
            <IonButton onClick={reset}>
              <IonIcon slot='start' icon={refreshOutline} />
              Reset
            </IonButton>
          </IonCol>
        </IonRow>
        {calculatedBmi && 
        <IonRow>
          <IonCol>
            <IonCardContent className='ion-text-center'>
              <h2>Your Body-Mass Index</h2>
              <h3>{calculatedBmi.toFixed(2)}</h3>
            </IonCardContent>
          </IonCol>
        </IonRow>}
      </IonGrid>
    </IonContent>
  </IonApp>
  </React.Fragment>
  )
};

export default App;
