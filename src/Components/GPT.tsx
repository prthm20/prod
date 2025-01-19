import OpenAI from "openai";
const openai = new OpenAI();

// Function to generate horoscope content based on planet positions
const generateHoroscopeContent = async (planetPositionString: string) => {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o", 
        messages: [
            { role: "system", content: "You are a helpful assistant that specializes in astrology and horoscope generation." },
            {
                role: "user",
                content: `
                ${planetPositionString}
                providing information on below points descriptively is coumpulsary very very compulsary : 
                
               1. Kundali & Horoscope Generation:
               2.  Birth chart (Kundali) covering 12 houses. Insights on career, relationships, personal growth, family, and social connections. Daily and monthly horoscopes.
              AI Recommendations:
               3. Personalized gemstone suggestions. Pooja (rituals) recommendations with importance and benefits explained. Do’s and Don’ts based on astrological insights.
              4.Spiritual Content Delivery:
              5 .Meditation and workout suggestions aligned with horoscope insights. Sleep content tailored to user needs.

                
               `,
            },
        ],
    });

    return completion.choices[0].message.content;
}

// Example usage
const planetPositionString = "Sun in Capricorn, Moon in Taurus, Mars in Gemini, Venus in Libra, Jupiter in Aquarius, Saturn in Pisces";
generateHoroscopeContent(planetPositionString)
    .then(response => {
        console.log("Generated Horoscope Content:", response);
    })
    .catch(error => {
        console.error("Error generating content:", error);
    });
