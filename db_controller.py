from new_model import *
from sqlalchemy.exc import NoResultFound

# Utility function to commit or rollback transactions
def commit_or_rollback(session):
    try:
        session.commit()
    except:
        session.rollback()
        raise

# Department methods
def get_all_departments(session):
    return session.query(Department).all()

def get_department_by_id(session, department_id):
    try:
        return session.query(Department).filter_by(id=department_id).one()
    except NoResultFound:
        return None

def update_department(session, department_id, **kwargs):
    department = get_department_by_id(session, department_id)
    if department:
        for key, value in kwargs.items():
            setattr(department, key, value)
        commit_or_rollback(session)
    return department

def delete_department(session, department_id):
    department = get_department_by_id(session, department_id)
    if department:
        session.delete(department)
        commit_or_rollback(session)
    return department


# Features methods
def get_all_features(session):
    return session.query(Features).all()

def get_feature_by_id(session, feature_id):
    try:
        return session.query(Features).filter_by(id=feature_id).one()
    except NoResultFound:
        return None

def update_feature(session, feature_id, **kwargs):
    feature = get_feature_by_id(session, feature_id)
    if feature:
        for key, value in kwargs.items():
            setattr(feature, key, value)
        commit_or_rollback(session)
    return feature

def delete_feature(session, feature_id):
    feature = get_feature_by_id(session, feature_id)
    if feature:
        session.delete(feature)
        commit_or_rollback(session)
    return feature


# Product methods
def get_all_products(session):
    return session.query(Product).all()

def get_product_by_id(session, product_id):
    try:
        return session.query(Product).filter_by(id=product_id).one()
    except NoResultFound:
        return None

def update_product(session, product_id, **kwargs):
    product = get_product_by_id(session, product_id)
    if product:
        for key, value in kwargs.items():
            setattr(product, key, value)
        commit_or_rollback(session)
    return product

def delete_product(session, product_id):
    product = get_product_by_id(session, product_id)
    if product:
        session.delete(product)
        commit_or_rollback(session)
    return product


# Package methods
def get_all_packages(session):
    return session.query(Package).all()

def get_package_by_id(session, package_id):
    try:
        return session.query(Package).filter_by(id=package_id).one()
    except NoResultFound:
        return None

def update_package(session, package_id, **kwargs):
    package = get_package_by_id(session, package_id)
    if package:
        for key, value in kwargs.items():
            setattr(package, key, value)
        commit_or_rollback(session)
    return package

def delete_package(session, package_id):
    package = get_package_by_id(session, package_id)
    if package:
        session.delete(package)
        commit_or_rollback(session)
    return package