import asyncio
import edge_tts

text = """¿Te imaginas crear este tipo de motion graphics profesionales con puro código, sin pagarle un solo centavo a Claude ni a Codex?
O sea, ¿quién inventó que tienes que pagar suscripciones de doscientos dólares al mes? ¡Para nada!
Con código abierto puedes animar literalmente lo que se te ocurra, directamente en tu compu y con cero límites.
El límite no es tu billetera... ¡es tu imaginación!
Así que ojo: si veo que a muchos les interesa, voy a armar un curso súper, súper económico donde les enseñaré todo mi flujo de trabajo paso a paso.
¿Te gustaría entrar? Escríbeme un DM ahora mismo con la palabra MOTION, y si se junta suficiente gente, ¡lo abrimos y les enseño a todos!"""

async def main():
    # Slightly higher pitch and energetic pace (+6% rate, +2Hz pitch)
    communicate = edge_tts.Communicate(text, "es-MX-JorgeNeural", rate="+6%", pitch="+3Hz")
    submaker = edge_tts.SubMaker()
    with open("remotion/public/locucion_energetica.mp3", "wb") as file:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                file.write(chunk["data"])
            elif chunk["type"] in ("WordBoundary", "SentenceBoundary"):
                submaker.feed(chunk)
    
    with open("remotion/public/locucion_energetica.srt", "w", encoding="utf-8") as f:
        f.write(submaker.get_srt())
    print("Locución enérgica generada!")

asyncio.run(main())
