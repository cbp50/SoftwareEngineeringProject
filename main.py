# This is a sample Python script.
import numpy as np
import tensorflow as tf
import pandas as pd
from sklearn.metrics.pairwise import sigmoid_kernel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel

# Press Shift+F10 to execute it or replace it with your code.
# Press Double Shift to search everywhere for classes, files, tool windows, actions, and settings.


df = pd.read_csv('data.csv')
ds = pd.read_csv('sample.csv', header=None)

df = df[['name', 'artists']]
print(df.isnull().sum())
df.dropna(inplace=True)

tf = TfidfVectorizer(analyzer='word', ngram_range=(1, 3), min_df=0, stop_words='english')
matrix = tf.fit_transform(df['artists'])

cosine_similarities = linear_kernel(matrix, matrix)
song_title = df['name']
indices = pd.Series(df.index, index=df['name'])


def song_recommendation(song_name):
    idx = indices[song_name]
    sim_scores = list(enumerate(cosine_similarities[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:31]
    song_indices = [i[0] for i in sim_scores]
    return song_title.iloc[song_indices]


song_recommendation('Danny Boy').head(10)
