import asyncio
import edge_tts

text = """¿Te gustaría aprender a crear motion graphics profesionales con puro código, sin pagar licencias de Claude o Codex?
Muchos piensan que necesitas gastar cientos de dólares al mes en suscripciones caras. Pero la realidad es que con código abierto puedes animar lo que quieras, directamente en tu computadora y sin restricciones.
El único límite es tu imaginación: desde micro-animaciones para interfaces, hasta videos y reels comerciales completos.
Por eso estoy preparando un curso práctico, paso a paso y muy económico, donde te enseñaré todo mi flujo de trabajo desde cero.
Si estás interesado en entrar, escríbeme un mensaje al directo para apartar tu lugar antes del lanzamiento. ¡Te veo dentro!"""

with open("remotion/public/script.txt", "w", encoding="utf-8") as f:
    f.write(text)

async def main():
    communicate = edge_tts.Communicate(text, "es-MX-JorgeNeural", rate="-2%")
    submaker = edge_tts.SubMaker()
    with open("remotion/public/voiceover.mp3", "wb") as file:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                file.write(chunk["data"])
            elif chunk["type"] in ("WordBoundary", "SentenceBoundary"):
                submaker.feed(chunk)
    
    with open("remotion/public/voiceover.srt", "w", encoding="utf-8") as f:
        f.write(submaker.get_srt())
    print("Locución y subtítulos generados con éxito!")

asyncio.run(main())
