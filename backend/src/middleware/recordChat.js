let loggingActive = false;
const chatLog = [];

export const checkFirst = (req, res, next) => {
  const { message } = req.body;

  if (message && message.includes("#logthis")) {
    loggingActive = true;
  }

  if (!loggingActive) {
    console.log("Logging not active, just saying hi.");
    return res.status(200).json({ message: "ok" }); 
  }

  next(); 
};

export const logControl = (req, res, next) => {
  const { message } = req.body;

  if (message && message.includes("#logthis")) {
    loggingActive = true;
    chatLog.length = 0; // Reset log
    console.log(" Logging activated.");
    return res.status(200).json({ message: "Logging activated." }); 
  }

  req.loggingActive = loggingActive;
  next();
};

export const unlogControl = (req, res, next) => {
  const { message } = req.body;

  if (message && message.includes("#stoplogging")) {
    loggingActive = false;
    console.log("Logging deactivated.");
    return res.status(200).json({ message: "Logging deactivated." }); 
  }

  req.loggingActive = loggingActive;
  next();
};

export const recordChat = (req, res, next) => {
  const { message } = req.body;

  if (req.loggingActive && message) {
    chatLog.push({ message, timestamp: new Date() });
    console.log("Chat logged:", message);
    res.status(200).json({ message: "Chat recorded." }); //should use return here to stop further processing but we want to continue to next middleware
  }


  next();
};

export const getChatLog = () => console.log(chatLog);
