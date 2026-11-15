import pandas as pd
import numpy as np
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.model_selection import train_test_split



FILEPATH = "/home/fidisroxy/development/house-app/house-pred-app/ml/data/processed/uk_housing_data.csv"


df = pd.read_csv(FILEPATH)

target = "saleEstimate_currentPrice"
features_to_drop = ['rentEstimate_upperPrice','rentEstimate_lowerPrice',
            'rentEstimate_currentPrice', 'saleEstimate_upperPrice','saleEstimate_lowerPrice']
X = df.drop(
    columns=features_to_drop,
    errors= "ignore"
)

y = df[target]


X_train, X_test, y_test = train_test_split(
    
    X, y, test_size=0.3,
    random_state=42
)