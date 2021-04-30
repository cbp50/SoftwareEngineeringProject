# This is a sample Python script.
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import sigmoid_kernel
from sklearn.feature_extraction.text import TfidfVectorizer

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.


df = pd.read_csv('data.csv')
df.dropna()
df_clean = df.drop(columns=['id', 'popularity'])
tf = TfidfVectorizer(analyzer='word', token_pattern=r'\w{1,}', ngram_range=(1, 3), stop_words='english')
matrix = tf.fit_transform(df_clean['artists'].astype('U'))
sigmoid = sigmoid_kernel(matrix, matrix)
song_title = df_clean['name']
indices = pd.Series(df_clean.index, index=df_clean['name'])


def song_recommendation(song_name):
    idx = indices[song_name]
    sim_scores = list(enumerate(sigmoid[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]
    song_indices = [i[0] for i in sim_scores]
    return df_clean['name'].iloc[song_indices]


print(song_recommendation('7 rings').head(10))
