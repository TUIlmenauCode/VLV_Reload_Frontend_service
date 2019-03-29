# Welcome at VLV_Reload_Frontend_service


```
SELECT GroupTermins.termin, `Event`.`title` FROM `GroupTermins`, `Termin`, `Event` WHERE GroupTermins.group = 154 AND GroupTermins.termin = Termin.terminID AND Termin.event = `Event`.`eventID`
```