import pandas as pd
import logging
import re
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.pipeline import Pipeline




logging.basicConfig(
    level = logging.INFO,
    format= '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)


logger = logging.getLogger('data-preprocessor')

PATH = "/home/fidisroxy/development/house-app/house-pred-app/ml/data/raw/kaggle_london_house_price_data.csv"


categorical_features = []

numerical_features = []


def load_data(filepath: str):
    
    logger.info(f"Loading file from: {filepath}")
    file = pd.read_csv(filepath)
    return file


def duplicate(dataFrame):
    df = dataFrame.copy()
    return df


def drop_features():
    pass

def find_null_features(df):
    
    df = df.copy()
    numerical_null_features = df.select_dtypes(
    include="number"
        ).columns[df.select_dtypes(include="number").isnull().any()].tolist()

    
    categorical_null_features = df.select_dtypes(
    include=["object", "category", "string"]
    ).columns[
        df.select_dtypes(
            include=["object", "category", "string"]
        ).isnull().any().tolist()
    ]
  

    return df, numerical_null_features, categorical_null_features
        
        
        
    
def handle_null_values(df,numerical_null_values, categorical_null_values):
    
    mean_imputer = SimpleImputer(strategy='mean')
    df[[numerical_null_values]] = mean_imputer.fit_transform(df[[numerical_null_values]])
    
    return df
      
      
      
      
      
def preprocess_pipeline(filepath:str):
    df = load_data(filepath)
    df,numerical_null_features, categorical_null_features = find_null_features(df)
    df = handle_null_values(df,numerical_null_features, categorical_null_features)
    
    df.to_csv("/home/fidisroxy/development/house-app/house-pred-app/ml/data/processed")
    return df