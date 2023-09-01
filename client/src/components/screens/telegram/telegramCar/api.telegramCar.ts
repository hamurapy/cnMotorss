import type telegramCarType from "./telegramCar.types";

export async function appApplication({application}: {application: telegramCarType}): Promise<void> {
    const res = await fetch('http://localhost:4000/api/telegramBotCar', {
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