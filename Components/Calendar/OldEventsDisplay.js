<View style={styles.dayContainer}>
                    <Text style={styles.dayHeading}>{getDayOfWeek(dayNum + 1)}</Text>
                    <DisplayEvents
                            key={`event-${forceUpdateId}`}
                            month={getDate(currentMonth, currentDay + 1)[0]}
                            day={getDate(currentMonth, currentDay + 1)[1]}/>
                </View>
                <View style={styles.dayContainer}>
                    <Text style={styles.dayHeading}>{getDayOfWeek(dayNum + 2)}</Text>
                    <DisplayEvents 
                            key={`event-${forceUpdateId}`}
                            month={getDate(currentMonth, currentDay + 2)[0]}
                            day={getDate(currentMonth, currentDay + 2)[1]}/>
                </View>
                <View style={styles.dayContainer}>
                    <Text style={styles.dayHeading}>{getDayOfWeek(dayNum + 3)}</Text>
                    <DisplayEvents
                            key={`event-${forceUpdateId}`}
                            month={getDate(currentMonth, currentDay + 3)[0]}
                            day={getDate(currentMonth, currentDay + 3)[1]}/>
                </View>
                <View style={styles.dayContainer}>
                    <Text style={styles.dayHeading}>{getDayOfWeek(dayNum + 4)}</Text>
                    <DisplayEvents
                            key={`event-${forceUpdateId}`}
                            month={getDate(currentMonth, currentDay + 4)[0]}
                            day={getDate(currentMonth, currentDay + 4)[1]}/>
                </View>
                <View style={styles.dayContainer}>
                    <Text style={styles.dayHeading}>{getDayOfWeek(dayNum + 5)}</Text>
                    <DisplayEvents
                            key={`event-${forceUpdateId}`}
                            month={getDate(currentMonth, currentDay + 5)[0]}
                            day={getDate(currentMonth, currentDay + 5)[1]}/>
                </View>
                <View style={styles.dayContainer}>
                    <Text style={styles.dayHeading}>{getDayOfWeek(dayNum + 6)}</Text>
                    <DisplayEvents
                            key={`event-${forceUpdateId}`}
                            month={getDate(currentMonth, currentDay + 6)[0]}
                            day={getDate(currentMonth, currentDay + 6)[1]}/>
                </View>