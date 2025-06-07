let loggingActive = false;
const chatLog = [];

export const checkFirst = (req, res, next) => {
      const { message } = req.body;
       if (message && message.includes("#logthis")) {
          loggingActive = true;
       }
      if (loggingActive === false){
        console.log("ok");
        res.status(200).json({ message: "ok" });
      }

      next();
}

export const logControl = (req, res, next) => {
  const { message } = req.body;

 
  if (message && message.includes("#logthis")) {
    chatLog.length = 0; // reset
    console.log("Logging activated.");
    res.status(200).json({ message: "Logging activated." });
  }

    req.loggingActive = loggingActive;
    next();

};

export const unlogControl = (req, res, next) => {
  const { message } = req.body;

 
  if (message && message.includes("#stoplogging")) {
    loggingActive = false;
    
    console.log("Logging deactivated.");
    res.status(200).json({ message: "Logging deactivated." });
  }

    req.loggingActive = loggingActive;
    next();

};

export const recordChat = (req, res, next) => {
  const { message } = req.body;

  if (req.loggingActive && message ) {
    chatLog.push({ message, timestamp: new Date() });
    console.log("Chat logged:", message);
    res.send();
  }

  next();

};

export const getChatLog = () => console.log(chatLog);