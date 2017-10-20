import csv
import urllib2
import json

def main():

    validOption = False

    while not validOption:
        choice = raw_input("Enter 1 for OoT Bingo Data, 2 for OoT Item Weight Data, or 3 for MM Item Data: \n")
        if eval(choice) == 1 or eval(choice) == 2 or eval(choice) == 3:
            validOption = True

    if eval(choice) == 1:
        name = 'name'
        difficulty = 'difficulty'
        time = 'time'
        skill = 'skill'
        timey = '#timey'
        outputFileName = 'raceData.json'

        url = "https://docs.google.com/spreadsheets/d/1dRpwfIV2vDRL_Hq-pBj3U7wq7XwZ9JPW9Ac8hK5qbgc/export?format=csv&id=1dRpwfIV2vDRL_Hq-pBj3U7wq7XwZ9JPW9Ac8hK5qbgc&gid=0"
        response = urllib2.urlopen(url)
        cr = csv.reader(response)

        i = 0
        dict1 = {}

        for row in cr:
            if i != 0 and i != 1 and i < 193 and row[1] != "":
                dict2 = {}
                dict2[name] = row[1]
                dict2[difficulty] = row[3]
                dict2[time] = row[4]
                dict2[skill] = row[5]
                dict2[timey] = row[6]
                dict1[row[1]] = dict2
            i += 1

        with open(outputFileName, 'w') as outfile:
            json.dump(dict1, outfile, indent=4)
    elif eval(choice) == 2:
        url = 'https://docs.google.com/spreadsheets/u/0/d/1ry0cdJ4MrImkCsfLHvWAKD9Ude_W3641UnJGBQ2zseU/export?format=csv&id=1ry0cdJ4MrImkCsfLHvWAKD9Ude_W3641UnJGBQ2zseU&gid=0'
        name = 'name'
        mean = 'mean'
        stDev = 'Std. Dev'
        negChance = 'Negative Chance'
        outputFileName = 'itemInfo.js'

        response = urllib2.urlopen(url)
        cr = csv.reader(response)

        i = 0
        finalArray = []
        for row in cr:
            if i != 0 and i < 121:
                arr = []
                arr.append(row[0])
                arr.append(row[1])
                arr.append(row[2])
                arr.append(row[3])
                arr.append(row[4])
                arr.append(row[5])
                finalArray.append(arr)
            i += 1

        with open(outputFileName, 'w') as outfile:
            json.dump(finalArray, outfile)

    elif eval(choice) == 3:
        url = 'https://docs.google.com/spreadsheets/d/1U34tdX8-wHPjLlsxnrWb8gE9PwWoDuQZJQcM8IoYows/export?gid=0&format=csv'
        name = 'name'
        mean = 'mean'
        stDev = 'Std. Dev'
        negChance = 'Negative Chance'
        outputFileName = 'MM_ItemInfo.json'

        response = urllib2.urlopen(url)
        cr = csv.reader(response)

        i = 0
        finalArray = []
        for row in cr:
            if i != 0 and i < 100:
                arr = []
                arr.append(row[0])
                arr.append(row[1])
                arr.append(row[2])
                arr.append(row[3])
                arr.append(row[4])
                arr.append(row[5])
                finalArray.append(arr)
            i += 1

        with open(outputFileName, 'w') as outfile:
            json.dump(finalArray, outfile)
main()