library(tidyverse)

# If the tidyverse package is not present, enter this at the console:
# install.packages("tidyverse")

# Enter this at the console, replacing with the correct path.
# setwd("REPLACE WITH PATH TO/info3300-spr2018/Prompts/031218")

temperature_data <- read_csv("noaa-central-park.csv") %>%
  mutate(Year = as.numeric(substr(Date, 0, 4))) %>%
  group_by(Year) %>%  
  summarise(mean = mean(Anomaly), max = max(Anomaly), min = min(Anomaly))

ggplot(temperature_data, aes(Year,mean)) +
  labs(x = "Year", y = "Mean", title ="Yearly Temperature Anomalies") + 
  geom_ribbon(aes(ymin=min, ymax=max),fill="#cccccc") +
  geom_line(colour = "black") +
  scale_x_continuous(breaks = scales::pretty_breaks(n = 10)) +
  scale_y_continuous(breaks = scales::pretty_breaks(n = 20)) +
  theme_classic()
  

