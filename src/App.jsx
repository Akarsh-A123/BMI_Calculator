import './App.css'
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import image from '/src/assets/bmiindex(1).png'



function App() {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);
  const [body, setBody] = useState(0);
  const [message, setMessage] = useState('');
  const [gender, setGender] = useState('');
  const [isweight, setIsweight] = useState(true);
  const [isheight, setIsheight] = useState(true);
  const [isage, setIsage] = useState(true);
  const [percentage,setPercentage] = useState(0);
  const [color,setColor] = useState('')
  const [tip,setTip] =useState('')

  const validate = (e) => {
    const data = e.target.value;
    const name = e.target.name;
    if (!!data.match(/^[0-9]*$/)) {
      if (name == 'weight') {
        setWeight(data)
        setIsweight(true)
      }
      else if (name == 'height') {
        setHeight(data)
        setIsheight(true)
      }
      else if (name == 'age') {
        setAge(data)
        setIsage(true)
      }
    }
    else {
      if (name == 'weight') {
        setWeight(data)
        setIsweight(false)
      }
      else if (name == 'height') {
        setHeight(data)
        setIsheight(false)
      }
      else if (name == 'age') {
        setAge(data)
        setIsage(false)
      }
    }

  }

  const reset = () => {
    setWeight(0)
    setIsweight(true)
    setHeight(0)
    setIsheight(true)
    setAge(0)
    setIsage(true)
    setPercentage(0)
    setBody(0)
  }

  const claculate = (e) => {
    e.preventDefault()
    console.log(age, height, weight)
    const het = height / 100;
    const bmi = Math.round(weight / het ** 2)
    const idweight =Math.round(24*(het**2))
    const req_weight=idweight-weight;
    if(req_weight>10){
      setTip(`Increase weight by ${req_weight} kg`)
    }
    else if(req_weight<0){
      setTip(`Decrease weight by ${req_weight*-1} kg`)
    }
    else{
      setTip('Keep up the good health')
    }


    console.log(bmi)
    if (age > 19) {
      if (bmi < 16) {
        console.log('sever thinnes')
        setBody(bmi)
        setMessage('Sever thinnes')
        setPercentage(20)
        setColor('#52caf5')
      }
      else if (bmi >= 16 && bmi <= 17) {
        console.log('moderate thinnes')
        setBody(bmi)
        setMessage('Moderate thinnes')
        setPercentage(30)
        setColor('#52caf5')
      }
      else if (bmi > 17 && bmi <= 18) {
        console.log('mild thinness')
        setBody(bmi)
        setMessage('Mild thinness')
        setPercentage(35)
        setColor('#52caf5')
      }
      else if (bmi > 18 && bmi < 25) {
        console.log('normal')
        setBody(bmi)
        setMessage('Normal')
        setPercentage(50)
        setColor('green')
      }
      else if (bmi >= 25 && bmi < 30) {
        console.log('overWeight')
        setBody(bmi)
        setMessage('OverWeight')
        setPercentage(90)
        setColor('yellow')
      }
      else if (bmi >= 30 && bmi < 35) {
        console.log('obese class 1')
        setBody(bmi)
        setMessage('Obese class 1')
        setPercentage(130)
        setColor('orange')
      }
      else if (bmi >= 35 && bmi < 40) {
        console.log('obese class 2')
        setBody(bmi)
        setMessage('Obese class 2')
        setPercentage(155)
        setColor('red')
      }
      else if (bmi >= 40) {
        console.log('obese class 3')
        setBody(bmi)
        setMessage('Obese class 3')
        setPercentage(175)
        setColor('red')
      }
    }
  }
 

  return (
    <>
      <div className='row p-md-0 p-2 w-100 mt-3'>
        <div className="col-md-4"></div>
        <div className="col-md-4 ms-2 ms-md-0 rounded px-4 d-flex flex-column align-items-center" style={{ background: 'transparent', backdropFilter: "blur(30px)", border: '1px solid #095972' }}>
          <h1 className='text-center mt-1 ' style={{ color: '#095972' }}>BMI Calculator</h1>


          <div className=' d-flex flex-column align-items-center mb-md-0 mb-4'>
            <img src={image} width='70%' />
            <div id='circle' style={{ width: '150px', height: '150px', position: 'absolute', marginTop: '13%', transform: 'rotate(-90deg)' }}>
              <CircularProgressbarWithChildren value={percentage} maxValue={180} counterClockwise={false} circleRatio={0.5} styles={{path:{stroke:color,strokeLinecap:"butt"},trail:{strokeLinecap:"butt"}}}>
                <div className='text-center' style={{ transform: 'rotate(90deg)' }}>
                  <p className='fw-bold mt-md-0 mt-3'>BMI: {body} <br /><br/><span  style={{color:color}}>{message}</span></p>
                </div>
              </CircularProgressbarWithChildren >
            </div>
          </div>
          <h4 className='mt-3' style={{color:color}}>{tip}</h4>
      
          <form className=' w-100 border-0 mt-2' onSubmit={claculate} style={{ background: 'transparent' }}>
            <div className='w-100 mt-3'>
              <TextField sx={{
                // Root class for the input field
                "& .MuiOutlinedInput-root": {
                  color: "#095972",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                  // Class for the border around the input field
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#095972",
                    borderWidth: "1px",
                  },
                },
                // Class for the label of the input field
                "& .MuiInputLabel-outlined": {
                  color: "white",

                },
              }}
                id="outlined-basic" value={weight || ''} label="Weight (kg)" variant="outlined" className='w-100' name='weight' onChange={(e) => { validate(e) }} />
              {!isweight && <p className='text-danger'>*Invalid Input</p>}
            </div>
            <div className='w-100 mt-1' >
              <TextField sx={{
                // Root class for the input field
                "& .MuiOutlinedInput-root": {
                  color: "#095972",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                  // Class for the border around the input field
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#095972",
                    borderWidth: "1px",
                  },
                },
                // Class for the label of the input field
                "& .MuiInputLabel-outlined": {
                  color: "white",

                },
              }}
                id="outlined-basic" value={height || ''} label="Height (cm)" variant="outlined" className='w-100' name='height' onChange={(e) => { validate(e) }} />
              {!isheight && <p className='text-danger'>*Invalid Input</p>}
            </div>
            <div className='w-100 mt-2'>
              <TextField sx={{
                // Root class for the input field
                "& .MuiOutlinedInput-root": {
                  color: "#095972",
                  fontFamily: "Arial",
                  fontWeight: "bold",
                  // Class for the border around the input field
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#095972",
                    borderWidth: "1px",
                  },
                },
                // Class for the label of the input field
                "& .MuiInputLabel-outlined": {
                  color: "white",

                },
              }}
                id="outlined-basic" value={age || ''} label="Age" variant="outlined" className='w-100' name='age' onChange={(e) => { validate(e) }} />
              {!isage && <p className='text-danger'>*Invalid Input</p>}
            </div>
            <RadioGroup row aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group" className='mt-2 ' >
              <FormControlLabel  value="female" control={<Radio />} label="Female" onChange={(e) => { setGender(e.target.value) }} />
              <FormControlLabel value="male" control={<Radio />} label="Male" onChange={(e) => { setGender(e.target.value) }} />
            </RadioGroup>
            <div className='mt-2 mb-3'>
              <button type='submit' className='btn' style={{ backgroundColor: '#095972', color: 'white' }} disabled={(isweight && isage && isheight) ? false : true}>Submit</button>
              <button type='button' onClick={reset} className='btn ms-3' style={{ backgroundColor: '#095972', color: 'white' }} >Reset</button>
            </div>
          </form>

        </div>
        <div className="col-md-4">

        </div>

      </div>
    </>
  )
}

export default App
