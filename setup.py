#from pathlib import Path
from setuptools import setup, find_packages

#from setuptools.command.install import install

#class PostInstall(install):
    #""" Post install commands """
    #Path(current_app.config['DATABASE']).touch
    

setup(
    name='robots',
    version='0.2',
    packages=["robots"],
    include_package_data=True,
    install_requires=[
        'flask',
    ],
    zip_safe=False,
    #scripts=["robots/install.sh"]
)
