import React from 'react'
import Classes from './form.module.scss'

const Form = ({ data }) => {

    const createMarkup = (text)  => {
        return {__html: text}
      }

    const form = data.form
      console.log(data)
    return (
        <section className="section">
            <div className="container">
                <div className="row middle-xs">
                    <div className="col col-sm-12 col-md-6">
                        <h2>{data.title}</h2>
                        <div dangerouslySetInnerHTML={createMarkup(data.text)}></div> 
                    </div>
                    <div className="col col-sm-12 col-md-6">
                        <div className="card card-visible text-left">
                            <form name={form.formName} method="post" action={`/${form.succesPage.slug}`} data-netlify="true" data-netlify-honeypot="bot-field" data-netlify-recaptcha="true">
                            <input type="hidden" name="form-name" value={form.formName} />
                            <p class="hidden">
                                <label>Don’t fill this out if you're human: <input name="bot-field" /></label>
                            </p>
                                {form.formFields.map((f, i) =>
                                    
                                    <div key={i} className={Classes.formFields}>
                                       {f.internal.type !== 'DatoCmsCheckbox' && f.internal.type !== 'DatoCmsRadioButtonField' ? 
                                       <label className={Classes.label} htmlFor={f.name}>{f.label}</label>
                                       : 
                                       <p className={Classes.label}>{f.label}</p>
                                       }
                                        {f.helpText ? 
                                            <div className={Classes.helpText} dangerouslySetInnerHTML={createMarkup(f.helpText)}></div> 
                                        : null }


                                        { f.internal.type === 'DatoCmsTextField' || f.internal.type === 'DatoCmsEmailField' || f.internal.type === 'DatoCmsNumberField' ?

                                            <input 
                                                type={f.internal.type.replace('DatoCms', '').replace('Field', '')} 
                                                id={f.name} 
                                                name={f.name} 
                                                placeholder={f.placeholder} 
                                                required={f.required || false} 
                                            />

                                        : f.internal.type === 'DatoCmsTextareaField' ?

                                            <textarea type="textarea" 
                                                id={f.name} 
                                                name={f.name} 
                                                placeholder={f.placeholder} 
                                                required={f.required || false} 
                                            >
                                            </textarea>

                                        : f.internal.type === 'DatoCmsCheckbox' ?

                                            f.checkboxes.map((b, i) =>
                                                <div key={i} >
                                                    <input 
                                                        
                                                        type="checkbox" 
                                                        id={`${f.name}-${i}`} 
                                                        name={`${f.name}-${i}`} 
                                                        value={b} 
                                                        required={f.required || false} 
                                                        // checked={false} 
                                                    />
                                                    <label htmlFor={`${f.name}-${i}`}>
                                                        {b}
                                                    </label>
                                                </div>
                                            )
                                            
                                        : f.internal.type === 'DatoCmsSelectField' ?

                                            <select 
                                                type="select" 
                                                id={f.name} 
                                                name={f.name} 
                                                placeholder={f.placeholder} 
                                                required={f.required || false} 
                                            >

                                                <option value="">
                                                    {f.placeholder}
                                                </option>

                                                {f.options.map((o, i) => 
                                                    <option key={i} value={o}>
                                                        {o}
                                                    </option>
                                                )}

                                            </select>

                                        : f.internal.type === 'DatoCmsRadioButtonField' ?

                                            f.radioButtons.map((b, i) => 
                                            <div key={i} >
                                                <label >
                                                <input 
                                                    
                                                    type="radio" 
                                                    id={`${f.name}-${i}`} 
                                                    name={f.name} 
                                                    value={b} 
                                                    required={f.required || false} 
                                                    // checked={false}
                                                />
                                                
                                                    {b}
                                                </label>
                                            </div>
                                            )
                                        : null }

                                    </div>
                                )}
                                <div data-netlify-recaptcha="true"></div>
                                <button className="btn" type="submit" >{form.submitTitle}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Form