import type FormApplicationType from "./telegram.types";

export async function appApplication({application}: {application: FormApplicationType}): Promise<void> {
    const res = await fetch(`${process.env.PORT_BACKEND}/api/telegramBot`, {
      method: 'POST',
      body: JSON.stringify(application),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    if (data.message === 'good') {
       return data
    } 
      throw new Error(data.message)
    
}